require 'rails_helper'

RSpec.describe Redemption, type: :model do
  
  describe 'Associations' do
  	it { should belong_to :campaign }
  	it { should belong_to :customer }
  	it { should belong_to :location }
  end


  describe 'Award Methods' do
    describe '#award_points_to_customer!' do
      it 'awards points to the customer' do
        @location   = FactoryGirl.create(:location_with_business)
        @business   = @location.business
        @customer   = FactoryGirl.create(:customer)
        @membership = FactoryGirl.create(:membership, business: @business, customer: @customer, points: 100)
        @campaign   = FactoryGirl.create(:active_campaign, locations: [@location])
        @redemption = FactoryGirl.create(:redemption, campaign: @campaign, location: @location, customer: @customer)
        @receipt    = FactoryGirl.create(:receipt_approved, redemption: @redemption, amount: 35.24)

        @redemption.award_points_to_customer!

        expect(@membership.reload.points).to eq 135
      end
    end

    describe 'Share Awards' do
      before :each do
        @location   = FactoryGirl.create(:location_with_business)
        @business   = @location.business
        @referrer   = FactoryGirl.create(:customer)
        @referrer_membership = FactoryGirl.create(:membership, business: @business, customer_id: @referrer.id, points: 100)
        
        @referral   = FactoryGirl.create(:customer)
        @referral_membership = FactoryGirl.create(:membership, business: @business, customer_id: @referral.id, points: 100)

        @campaign   = FactoryGirl.create(:active_campaign, locations: [@location])
        FactoryGirl.create(:referral, campaign: @campaign, customer_id: @referral.id, referrer_id: @referrer.id)

        @redemption = FactoryGirl.create(:redemption, campaign: @campaign, location: @location, customer: @referral)
        @receipt    = FactoryGirl.create(:receipt_approved, redemption: @redemption, amount: 35.24)
      end

      describe '#award_points_to_referrer!' do
        context '[Campaign has a referrer_reward]' do
          it 'awards the referrer' do
            @campaign.update_attribute(:referrer_reward, 100)

            @redemption.award_points_to_referrer!
            expect(@referrer_membership.reload.points).to eq 200
          end
        end

        context '[Campaign DOES NOT have a referrer_reward' do
          it 'does not award the referrer' do
            @campaign.update_attribute(:referrer_reward, 0)

            @redemption.award_points_to_referrer!
            expect(@referrer_membership.reload.points).to eq 100
          end
        end
      end

      describe '#award_points_to_referral!' do
        context '[Campaign has a referral_reward]' do
          it 'awards the referral' do
            @campaign.update_attribute(:referral_reward, 100)

            @redemption.award_points_to_referral!
            expect(@referral_membership.reload.points).to eq 200
          end
        end

        context '[Campaign DOES NOT have a referral_reward' do
          it 'does not award the referral' do
            @campaign.update_attribute(:referral_reward, 0)

            @redemption.award_points_to_referral!
            expect(@referral_membership.reload.points).to eq 100
          end
        end
      end
    end
  end

end
