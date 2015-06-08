require 'faker'

FactoryGirl.define do
	
  factory :customer do
    first_name 	{ Faker::Name.first_name }
		last_name 	{ Faker::Name.last_name }
		email 			{ Faker::Internet.email }
		points 			500
		active 			true
		contacted 	false

		factory :inactive_customer do
			active false
		end

		factory :broke_customer do
			points 0
		end
  end

end
