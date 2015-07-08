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

	def self.import(file, opts)
		business = opts['business']

		counter = 0
	  SmarterCSV.process(file, chunk_size: 100, key_mapping: {first: :first_name, last: :last_name}) do |r|
	  	customer = Customer.create(r) do |c|
	  		c.set_points(r[:points], business)
	  	end
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

	def points=(opts)
		business   = opts[:business]
		the_points = opts[:points]

		set_wallet(business)
		set_points(the_points)
		# byebug
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
				wallet = @wallet
			else
				wallet = wallets.find_by_business_id(business)
			end
			
			if wallet.nil?
				wallet = Wallet.create(customer: self, business: business)
			end

			wallet
		end

		def self.open_csv(file)
		  if File.extname(file.original_filename) == '.csv'
		  	return CSV.read(file)
		  else
		  	raise "Unknown file type: #{file.original_filename}"
		  end
		end

end
