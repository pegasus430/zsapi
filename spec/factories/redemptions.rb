FactoryGirl.define do
  factory :redemption do
    campaign
		customer
		location
		created_at 	{ 2.hours.ago }
		status    	'pending'

		trait :with_receipt do
			after :create do |r|
				receipt = create(:receipt)
				r.receipt = receipt
				r.save
			end
		end

  end
end
