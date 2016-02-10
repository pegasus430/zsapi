require 'faker'

FactoryGirl.define do
  factory :location do
  	greeting
    business 				nil
		title 					{ Faker::Address.street_name + " Location" }
		address 				{ Faker::Address.street_address}
		address2 				'ignore'
		city 						{ Faker::Address.city }
		state 					{ Faker::Address.state_abbr }
		zipcode 				{ Faker::Address.zip }
		latitude				nil
		longitude				nil
		status 					'pending'

		factory :location_with_business do
			before :create do |l|
				b = create(:business)
				l.business = b
			end
		end

		# Same as below
		factory :location_with_beacon do
			before :create do |l|
				create(:beacon, location: l)
			end
		end
		#Same as abov
		factory :pending_location do
			status 'pending'
		end

		factory :active_location do
			status 'active'
		end

		## TRAITS
		trait :with_campaign do
			after :create do |l|
				create(:campaign, locations: [l])
			end
		end

		trait :with_business do
			after :create do |l|
				b = create(:business)
				l.business = b
				l.save
			end
		end

		trait :with_beacon do
			before :create do |l|
				create(:beacon, location: l)
			end
		end
  end

end
