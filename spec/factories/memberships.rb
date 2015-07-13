FactoryGirl.define do
  factory :membership do
  	business
  	customer
  	points 500
  	last_visit_at { Date.yesterday }
  	last_exit_at { Date.yesterday }
  	exit_campaign_id
  	exit_campaign_expires_at
  	notified false
  end
end