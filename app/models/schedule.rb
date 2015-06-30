class Schedule < ActiveRecord::Base
	LAST_DAY = 99

	has_many :campaigns

	validates_presence_of :title, :days_of_week, :weeks_of_month, :day_numbers

	def self.valid_for(date)
		# Add '99' (the last day criteria) to the query if 'date.day' is equal to the last day of the month
		add_last_day = (date.day == date.end_of_month.day) ? Schedule::LAST_DAY : nil

		campaigns ||= false

		if campaigns
			byebug
			includes(:campaigns).where("
				( campaigns.start_at >= ? AND (campaigns.end_at IS NULL OR campaigns.end_at <= ? ) )
				AND days_of_week && '{0, ?}'::INT[]
				AND weeks_of_month && '{0, ?}'::INT[]
				AND day_numbers && ?::INT[]",
				campaigns.start_at,
				campaigns.end_at,
				date.wday + 1,
				date.week_of_month,
				'{' + [0, date.day, add_last_day].compact.join(',') + '}'
			)
		else
			where("
				days_of_week && '{0, ?}'::INT[]
				AND weeks_of_month && '{0, ?}'::INT[]
				AND day_numbers && ?::INT[]",
				date.wday + 1,
				date.week_of_month,
				'{' + [0, date.day, add_last_day].compact.join(',') + '}'
			)
		end
	end
end
