require 'rails_helper'

RSpec.describe Stat, type: :model do

  describe "Methods" do

  	describe '.total_checkins' do
			it 'calculates the visits for today' do
				business = FactoryGirl.create(:business)
				customer = FactoryGirl.create(:customer_with_membership_without_business, business: business)
				location2 = FactoryGirl.create(:location, business: business)
				location3 = FactoryGirl.create(:location, business: business)
				2.times { customer.check_in_to!(location2) }
				3.times { customer.check_in_to!(location3) }

				# Last checkin for location2 was yesterday
				customer.visits_for(location2).first.update_attribute(:last_visit_at, Date.yesterday)

				expect(Stat.total_checkins(query: business.locations, 	range: Date.today.beginning_of_day..Date.today.end_of_day)).to eq 1
				expect(Stat.total_checkins(query: location2, 					range: Date.today.beginning_of_day..Date.today.end_of_day)).to eq 0
			end
		end


  	describe '.redemptions_for_date' do
  		it 'counts redemptions for today' do
  			business 	= FactoryGirl.create(:business)
  			location1 = FactoryGirl.create(:location, business: business)
  			location2 = FactoryGirl.create(:location, business: business)
  			FactoryGirl.create_list(:redemption, 2, location: location1)
  			FactoryGirl.create_list(:redemption, 3, location: location2)

  			expect(Stat.total_redemptions(query: business.locations, range: Date.today.beginning_of_day..Date.today.end_of_day)).to eq 5
  		end
  	end

  end

end