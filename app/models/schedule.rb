class Schedule < ActiveRecord::Base
	LAST_DAY = 99

	has_many :campaigns

	validates_presence_of :title, :days_of_week, :weeks_of_month, :day_numbers

	def day_selector
		day_numbers.join(',')
	end

	def day_selector=(value)
		self[:day_numbers] = value.split(',')
	end


	def dom_selector
		return "always" if day_numbers == [0]
		return "last" 	if day_numbers == [Schedule::LAST_DAY]
		return "custom"	if day_numbers != [Schedule::LAST_DAY] && day_numbers != [0]
	end

	def dom_selector=(value)
		case value
		when "always" then self[:day_numbers] = [0]
		when "last" then self[:day_numbers] = [LAST_DAY]
		else "custom"
		end
	end


end
