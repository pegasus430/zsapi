FactoryGirl.define do
  factory :schedule do
    title 					"Normal Schedule"
		days_of_week 		[0]
		weeks_of_month 	[0]
		day_numbers 		[0]

		factory :sched_every_monday do
			title 	'Every Monday'
			days_of_week 		[2]
			weeks_of_month 	[0]
			day_numbers 		[0]
		end

		factory :sched_every_other_monday do
			title 	'every other monday'
			days_of_week 		[2]
			weeks_of_month 	[1,3]
			day_numbers 		[0]
		end

		factory :sched_every_tue_and_thur do
			title 	'every tue and thur'
			days_of_week 		[3,5]
			weeks_of_month 	[0]
			day_numbers 		[0]
		end

		factory :sched_always do
			title 	'always'
			days_of_week 		[0]
			weeks_of_month 	[0]
			day_numbers 		[0]
		end

		factory :sched_first_day_of_month do
			title 	'first day of month'
			days_of_week 		[0]
			weeks_of_month 	[0]
			day_numbers 		[1]
		end

		factory :sched_last_day_of_month do
			title 	'Last day of the month'
			days_of_week 		[0]
			weeks_of_month 	[0]
			day_numbers 		[99]
		end

		factory :sched_every_day_except_sunday do
			title 	'every day except sunday'
			days_of_week 		[2,3,4,5,6,7]
			weeks_of_month 	[0]
			day_numbers 		[0]
		end

		factory :sched_months_with_5_weeks do
			title 	'months with 5 weeks'
			days_of_week 		[0]
			weeks_of_month 	[5]
			day_numbers 		[0]
		end

		factory :sched_when_tue_is_first_day_of_month do
			title 	'when tue is first day of month'
			days_of_week 		[3]
			weeks_of_month 	[0]
			day_numbers 		[1]
		end
  end

end
