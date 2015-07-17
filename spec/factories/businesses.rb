require 'faker'

FactoryGirl.define do

  factory :business do
    user
		name 						{ Faker::Company.name }
		status 					'published'
		image 				 	nil
		primary_color 	"FF0000"
		secondary_color "0000FF"
		website 				{ Faker::Internet.url }
		facebook 				{ Faker::Internet.url('facebook.com') }
		twitter 				{ Faker::Lorem.characters(10) }

		trait :with_image do
			image { fixture_file_upload(Rails.root.join('spec', 'fixtures', 'files', 'receipt.jpg'), 'image/jpeg') }
		end

		factory :business_with_locations do
			transient do
				business_count 2
			end

			after(:create) do |business, evaluator|
				create_list(:location, evaluator.business_count, business: business)
			end
		end

  end

end