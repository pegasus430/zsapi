require 'faker'

FactoryGirl.define do
  factory :user do
  	email					{ Faker::Internet.email }
  	password 			"password"
  	confirmed_at 	Date.today

  	first_name		{ Faker::Name.first_name }
  	last_name			{ Faker::Name.last_name }
  end
end