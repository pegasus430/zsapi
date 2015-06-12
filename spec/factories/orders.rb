require 'faker'

FactoryGirl.define do
  factory :order do
    location 	nil
		buyer_ip 				{ Faker::Internet.ip_v4_address }
		purchase_date 	{ Date.today }
		transaction_id 	{ Faker::Lorem.characters(10) }
		key 						nil
		status 					1
  end
end
