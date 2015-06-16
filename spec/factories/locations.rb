require 'faker'

FactoryGirl.define do
  factory :location do
    business 		nil
		title 			{ Faker::Address.street_name + " Location" }
		address 		{ Faker::Address.street_address}
		address2 		{ Faker::Address.secondary_address }
		city 				{ Faker::Address.city }
		state 			{ Faker::Address.state_abbr }
		zipcode 		{ Faker::Address.zip }

		factory :location_with_business do
			before :create do |l|
				b = create(:business)
				l.business = b
			end
		end

		factory :location_with_beacon do
			before :create do |l|
				create(:beacon, location: l)
			end
		end
  end

end
