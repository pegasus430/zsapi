require 'faker'

FactoryGirl.define do
	
  factory :customer do
    first_name 	{ Faker::Name.first_name }
		last_name 	{ Faker::Name.last_name }
		email 			{ Faker::Internet.email }
		active 			true
		contacted 	false

		factory :inactive_customer do
			active false
		end

		factory :customer_with_wallet do
			after(:create) do |cust, eval|
				b = create(:business)
				w = create(:wallet, business: b, customer: cust)
			end
		end

		factory :customer_with_wallet_without_business do
			transient do
				business nil
			end

			after(:create) do |cust, eval|
				create(:wallet, business: eval.business, customer: cust)
			end
		end
  end

end
