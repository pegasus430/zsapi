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
		trial_ends_at		nil

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


		##TRAITS
		trait :with_location do
			after(:create) do |b|
				create(:location, business: b)
			end
		end

		trait :with_customer do
			after(:create) do |b, eval|
				create(:customer_with_membership_without_business, business: b)
			end
		end

  end

end