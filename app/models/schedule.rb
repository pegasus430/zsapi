class Schedule < ActiveRecord::Base
	LAST_DAY = 99

	has_many :campaigns

	validates_presence_of :title, :days_of_week, :weeks_of_month, :day_numbers

end
