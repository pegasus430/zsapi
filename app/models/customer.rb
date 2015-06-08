class Customer < ActiveRecord::Base
	validates_presence_of :first_name, :last_name, :email, :points
	validates_uniqueness_of :email
	validates :points, numericality: { greater_than: 0 }

	def self.active
		Customer.where(active: true)
	end

	def self.inactive
		Customer.where(active: false)
	end

	def self.to_csv
		CSV.generate do |csv|
			cav << columns_names
			all.each do |customer|
				csv << customer.attributes.values_at(*columns_name)
			end
		end
	end

	def name
		[first_name, last_name].join(' ')
	end

end
