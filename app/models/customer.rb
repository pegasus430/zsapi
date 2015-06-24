class Customer < ActiveRecord::Base
	has_many :wallets
	has_many :visits
	has_many :locations, through: :visits

	validates_presence_of :first_name, :last_name, :email
	validates_uniqueness_of :email

	serialize :social_friends, Array

	def self.active
		Customer.where(active: true)
	end

	def self.inactive
		Customer.where(active: false)
	end

	def self.to_csv(options = {})
		CSV.generate(options) do |csv|
			csv << ["First Name","Last Name", "Email", "Points", "Active"]
			all.each do |customer|
				csv << [customer.first_name, customer.last_name, customer.email, customer.points, customer.active]
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

end
