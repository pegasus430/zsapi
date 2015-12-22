class Schedule < ActiveRecord::Base
	LAST_DAY = 99

	has_many :campaigns

	validates_presence_of :title, :days_of_week, :weeks_of_month, :day_numbers

	def dom_selector=(value)
		case value
		when "always" then self[:day_numbers] = [1..31]
		when "last" then self[:day_numbers] = [LAST_DAY]
		when "custom" then self[:day_numbers] = [1]
		end
	end


end
