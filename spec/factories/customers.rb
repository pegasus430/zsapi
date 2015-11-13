require 'faker'

FactoryGirl.define do
	
  factory :customer, aliases: [:referrer] do
    first_name 			{ Faker::Name.first_name }
		last_name 			{ Faker::Name.last_name }
		email 					{ Faker::Internet.email }
		avatar_url 			""

		factory :active_customer do
			status 'active'
		end

		factory :inactive_customer do
			status 'inactive'
		end

		factory :facebook_customer do
			social_type 					'facebook'
			sequence(:social_id) 	{ |n| "1#{n}" }
			social_token 					{ Faker::Internet.password(10) }
			social_friends 				[]
		end

		factory :googleplus_customer do
			social_type 					'google+'
			sequence(:social_id) 	{ |n| "2#{n}" }
			social_token 					{ Faker::Internet.password(10) }
			social_friends 				[]
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

		trait :with_membership do
			transient do
				business nil
			end

			after(:create) do |cust, eval|
				if eval.business.nil?
					create(:membership, business: eval.business, customer: cust)
				else
					create(:membership, business: create(:business, :with_user), customer: cust)
				end
			end
		end

		# Creates facebook_customers as friends, then sets social_friends
		trait :with_friends do
			social_friends [11,12,13,14,15]

			after(:create) do |cust, eval|
				create(:facebook_customer, social_id: 11)
				create(:facebook_customer, social_id: 12)
				create(:facebook_customer, social_id: 13)
				create(:facebook_customer, social_id: 14)
			end
		end
  end

end
