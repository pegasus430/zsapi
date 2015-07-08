require 'csv'

class Customer < ActiveRecord::Base
	enum status: [:inactive, :active]
	has_many :wallets
	has_many :visits
	has_many :locations, through: :visits

	validates_presence_of :first_name, :last_name, :email
	validates_uniqueness_of :email

	serialize :social_friends, Array

	def self.to_csv(options = {})
		CSV.generate(options) do |csv|
			csv << ["First Name","Last Name", "Email", "Points", "Status"]
			all.each do |customer|
				csv << [customer.first_name, customer.last_name, customer.email, customer.points(business), customer.status]
			end
		end
	end

	def self.import(file)
	  csv_file = open_csv(file)
	  byebug
	  header = csv_file.row(1)
	  (2..csv_file.last_row).each do |i|
	    row = Hash[[header, csv_file.row(i)].transpose]
	    product = find_by_id(row["id"]) || new
	    product.attributes = row.to_hash.slice(*accessible_attributes)
	    product.save!
	  end
	end


	def name
		[first_name, last_name].join(' ')
	end

	def name_reversed
		[last_name, first_name].join(', ')
	end

	# Points
	def points(business = nil)
		get_wallet(business).points
	end

	def wallet=(business)
		set_wallet(business)
	end

	def set_points(amount, business = nil)
		wallet = get_wallet(business)
		wallet.points = amount
		wallet.save
	end

	def increase_points_by(amount, business = nil)
		wallet = get_wallet(business)
		wallet.points += amount
		wallet.save
	end
	# End points

	def visit!(location)
		Visit.create_or_increment(customer: self, location: location)
	end

	def visits_for(location)
		visits.where(location: location).first.total rescue 0
	end


	private

		def set_wallet(business)
			@wallet = get_wallet(business)
		end

		def get_wallet(business = nil)
			if business.nil?
				@wallet
			else
				wallets.find_by_business_id(business)
			end
		end

		def self.open_csv(file)
		  if File.extname(file.original_filename) == '.csv'
		  	return CSV.read(file)
		  else
		  	raise "Unknown file type: #{file.original_filename}"
		  end
		end

end
