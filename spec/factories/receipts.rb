FactoryGirl.define do

  factory :receipt do
    location
		amount 				15
		purchased_on 	{ 2.days.ago }

		factory :receipt_approved do
			approved_on 	{ Date.today }
		end

		factory :receipt_rejected do
			rejected_on 	{ Date.today }
			reject_reason "You are so mean"
		end

		factory :receipt_with_location do
			before(:build) do |receipt|
				create(:location) do |loc|
					receipt.location = loc
				end
			end
		end

		factory :invalid_receipt do
			amount 				nil
			location 			nil
			purchased_on 	nil
		end
  end

end