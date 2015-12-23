require 'factory_girl'

namespace :devdata do

  task :print => :environment do
    puts "Hello"
  end

  task :submit_receipt => :environment do
    require 'open-uri'
    image = open("http://i.stack.imgur.com/qjKuQ.jpg")

    red = FactoryGirl.create(:redemption)
    FactoryGirl.create(:receipt, image: image, redemption: red)
  end

  task :new_user => :environment do
    # Create user with business
    password = "demo1234"
    user = FactoryGirl.create(:user, :with_business, password: password)
    puts "Login with #{user.email} and #{password}"
  end

  task :all => :environment do
    # Create users with businesses
    users = FactoryGirl.create_list(:user, 1, :with_business, password: "demo1234")

    # Go through each user and create locations, campaigns, beacons for the business
    users.each do |u|
      u.business.published!
      
      locations = FactoryGirl.create_list(:location, 5, :with_beacon, :with_campaign, business: u.business, status: 'active')
      
      # Go through each active location and create a greeting
      locations.each do |l|
        FactoryGirl.create(:greeting, campaign: l.campaigns.first, business: u.business)
        l.beacon.active!
        l.campaigns.first.active!
        l.campaigns.first.update_attribute(:business_id, u.business.id)
      end
      
      # Create customers
      customers = FactoryGirl.create_list(:customer, 1, :with_membership, business: u.business)
    end

    puts users.map(&:email)
  end

end