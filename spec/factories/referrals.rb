FactoryGirl.define do
  factory :referral do
    referrer
    customer
		campaign
		share_link
		status 'unused'
  end

end
