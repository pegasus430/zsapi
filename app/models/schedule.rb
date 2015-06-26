class Schedule < ActiveRecord::Base
	has_many :campaigns

	validates_presence_of :title, :days_of_week, :weeks_of_month, :day_numbers
end
