FactoryGirl.define do
  factory :membership do
  	business
    customer
    campaign
    points 500
    welcome_reward_valid_at { Date.tomorrow }
    exit_campaign_expires_at nil
    notified false
  end
end