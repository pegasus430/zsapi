class Customer < ActiveRecord::Base
	validates_presence_of :first_name, :last_name, :email, :points
	validates_uniqueness_of :email

	def name
		[first_name, last_name].join(' ')
	end

end
