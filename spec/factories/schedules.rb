FactoryGirl.define do
  factory :schedule do
    title 					"Normal Schedule"
		days_of_week 		[0]
		weeks_of_month 	[0]
		day_numbers 		[0]

		factory :schedule_every_monday do
			title 	'Every Monday'
			days_of_week 		[2]
			weeks_of_month 	[0]
			day_numbers 		[0]
		end
  end

end
