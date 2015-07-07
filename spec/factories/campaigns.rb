FactoryGirl.define do
  factory :campaign do
		schedule
    type_of 					'coupon'
		title 						"Military"
		discount_amount 	5
		discount_type 		'amount'
		image 						''
		share_reward 			100
		status 						'inactive'
		start_at 					{ "2015-01-01".to_date }
		end_at 						nil

		factory :active_campaign do
			status 'active'
		end

		factory :inactive_campaign do
			status 'inactive'
		end

		factory :featured_campaign do
			status 		'featured'
		end

		factory :invalid_campaign do
			status nil
			start_at nil
		end

		factory :campaign_with_image do
			image { fixture_file_upload(Rails.root.join('spec', 'fixtures', 'files', 'campaign.jpg'), 'image/jpeg') }
		end

		factory :coupon do
			type_of 					'coupon'
			sequence(:title) 	{ |n| "Coupon \##{n}"}
		end

		factory :reward do
			type_of 					'reward'
			sequence(:title) 	{ |n| "Reward \##{n}"}
		end

		factory :special do
			type_of 					'special'
			sequence(:title) 	{ |n| "Special \##{n}"}
		end
	end

end
