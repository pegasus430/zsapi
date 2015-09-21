require 'faker'

FactoryGirl.define do
  factory :subscription do
    location
		stripe_plan_id 		1
		stripe_sub_id 		nil
		next_billing_at 	nil
		status 						'inactive'
  end
end