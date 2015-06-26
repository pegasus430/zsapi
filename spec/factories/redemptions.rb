FactoryGirl.define do
  factory :redemption do
    campaign
		customer
		location
		created_at { 2.hours.ago }
  end
end
