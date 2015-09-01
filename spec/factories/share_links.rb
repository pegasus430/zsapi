require 'faker'

FactoryGirl.define do
  factory :share_link do
    campaign 	nil
		customer 	nil
		code 			{ Faker::Internet.password(10) }

		trait :no_code do
			code nil
		end
  end
end
