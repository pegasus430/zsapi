require 'rails_helper'

RSpec.describe Redemption, type: :model do
  
  describe 'Associations' do
  	it { should belong_to :campaign }
  	it { should belong_to :customer }
  	it { should belong_to :location }
  end


  describe 'Methods' do
  	describe '#award_points_to_customer!' do
  		it 'awards points to the customer' do
				@location   = FactoryGirl.create(:location_with_business)
				@business   = @location.business
				@customer   = FactoryGirl.create(:customer)
				@membership = FactoryGirl.create(:membership, business: @business, customer: @customer, points: 100)
				@campaign   = FactoryGirl.create(:active_campaign, locations: [@location])
				@redemption = FactoryGirl.create(:redemption, campaign: @campaign, location: @location, customer: @customer)
				@receipt 		= FactoryGirl.create(:receipt_approved, location: @location, redemption: @redemption, amount: 35.24)

				@redemption.award_points_to_customer!

				expect(@membership.reload.points).to eq 135
  		end
  	end
  end

end
