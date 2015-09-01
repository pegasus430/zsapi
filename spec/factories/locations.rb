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

		factory :location_with_business do
			before :create do |l|
				b = create(:business)
				l.business = b
			end
		end

		# Same as below
		factory :location_with_beacon do
			before :create do |l|
				create(:inactive_beacon, location: l)
			end
		end
		#Same as abov
		factory :pending_location do
			before :create do |l|
				create(:inactive_beacon, location: l)
			end
		end

		factory :active_location do
			before :create do |l|
				create(:active_beacon, location: l)
			end
		end

		## TRAITS
		trait :with_campaign do
			after :create do |l|
				create(:campaign, locations: [l])
			end
		end
  end

end
