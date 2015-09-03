require 'factory_girl_rails'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

FactoryGirl.create(:admin, email: "wes@wesfed.com", password: "abcd1234")

# The factories below should only be created during API testing
user = FactoryGirl.create(:user_with_business)
business = user.business
greeting = FactoryGirl.create(:greeting)
location = FactoryGirl.create_list(:location, 2, :with_beacon, business: business, greeting: greeting)
customers = FactoryGirl.create_list(:customer_with_membership_without_business, 2, business: business)