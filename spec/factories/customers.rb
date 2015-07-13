require 'faker'

FactoryGirl.define do
	
  factory :customer do
    first_name 			{ Faker::Name.first_name }
		last_name 			{ Faker::Name.last_name }
		email 					{ Faker::Internet.email }

		factory :active_customer do
			status 'active'
		end

		factory :inactive_customer do
			status 'inactive'
		end

		factory :facebook_customer do
			social_type 	'facebook'
			social_id 		1
			social_token 	{ Faker::Internet.password(10) }
			social_friends 	[]
		end

		factory :customer_with_membership do
			after(:create) do |cust, eval|
				b = create(:business)
				w = create(:membership, business: b, customer: cust)
			end
		end

		factory :customer_with_membership_without_business do
			transient do
				business nil
			end

			after(:create) do |cust, eval|
				create(:membership, business: eval.business, customer: cust)
			end
		end
  end

end
