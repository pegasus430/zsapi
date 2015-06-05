require 'faker'

FactoryGirl.define do
  factory :admin do
  	email				{ Faker::Internet.email }
  	encrypted_password 	"password"
  	manage_receipts 	true
  end
end