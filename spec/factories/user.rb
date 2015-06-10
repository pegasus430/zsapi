require 'faker'

FactoryGirl.define do
  factory :user do
  	email					{ Faker::Internet.email }
  	password 			"password"
  	confirmed_at 	Date.today

  	first_name		{ Faker::Name.first_name }
  	last_name			{ Faker::Name.last_name }

  	factory :user_with_business do
  		before :create do |u|
  			business = create(:business, user: u)
  		end
  	end
  end
end