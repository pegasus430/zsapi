FactoryGirl.define do
  factory :campaign do
		schedule
    type_of 					Campaign::CT_COUPON
		title 						"Military"
		discount_amount 	5
		discount_type 		Campaign::DT_AMOUNT
		image 						nil
		share_reward 			100
		featured 					false
		status 						false
		start_at 					{ 10.minutes.ago }
		end_at 						nil

		factory :active_campaign do
			status true
		end

		factory :inactive_campaign do
			status false
		end

		factory :featured_campaign do
			status 		true
			featured 	true
		end

		factory :campaign_with_image do
			image { fixture_file_upload(Rails.root.join('spec', 'fixtures', 'files', 'campaign.jpg'), 'image/jpeg') }
		end

		factory :coupon do
			type_of 					Campaign::CT_COUPON
			sequence(:title) 	{ |n| "Coupon \##{n}"}
		end

		factory :reward do
			type_of 					Campaign::CT_REWARD
			sequence(:title) 	{ |n| "Reward \##{n}"}
		end

		factory :special do
			type_of 					Campaign::CT_SPECIAL
			sequence(:title) 	{ |n| "Special \##{n}"}
		end
	end

end
