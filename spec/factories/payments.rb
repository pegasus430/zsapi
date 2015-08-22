require 'faker'

FactoryGirl.define do
  factory :payment do
    location
		buyer_ip 				{ Faker::Internet.ip_v4_address }
		transaction_id 	{ Faker::Lorem.characters(10) }
		key 						nil
		status 					'shipped'
  end
end
