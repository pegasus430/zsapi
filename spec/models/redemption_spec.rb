require 'rails_helper'

RSpec.describe Redemption, type: :model do
  
  describe 'Associations' do
  	it { should belong_to :campaign }
  	it { should belong_to :customer }
    it { should belong_to :location }
  	it { should have_one :receipt }
  end


  describe 'Award Methods' do
    describe '#award_points_to_customer!' do
      it 'awards points to the customer' do
        location   = FactoryGirl.create(:location_with_business)
        business   = location.business
        customer   = FactoryGirl.create(:customer)
        membership = FactoryGirl.create(:membership, 
          business: business, 
          customer: customer, 
          points: 100
        )
        campaign   = FactoryGirl.create(:active_campaign, locations: [location])
        redemption = FactoryGirl.create(:redemption, campaign: campaign, location: location, customer: customer)
        receipt    = FactoryGirl.create(:receipt_approved, redemption: redemption, amount: 35.24)

        redemption.award_points_to_customer!

        expect(membership.reload.points).to eq 135
      end
    end

    describe 'Share Awards' do
      before :each do
        @original_point_amount = 50
        @share_point_amount = 100
        @sum_point_amount = @original_point_amount + @share_point_amount

        @location   = FactoryGirl.create(:location_with_business)
        @business   = @location.business
        @referrer   = FactoryGirl.create(:customer)
        @referrer_membership = FactoryGirl.create(:membership, 
          business: @business, 
          customer_id: @referrer.id, 
          points: @original_point_amount
        )
        
        @referral   = FactoryGirl.create(:customer)
        @referral_membership = FactoryGirl.create(:membership, 
          business: @business, 
          customer_id: @referral.id, 
          points: @original_point_amount
        )

        @campaign   = FactoryGirl.create(:active_campaign, locations: [@location])
        FactoryGirl.create(:referral, campaign: @campaign, customer_id: @referral.id, referrer_id: @referrer.id)

        @redemption = FactoryGirl.create(:redemption, campaign: @campaign, location: @location, customer: @referral)
        @receipt    = FactoryGirl.create(:receipt_approved, redemption: @redemption, amount: 35.24)
      end

      describe '#award_share_points!' do
        context '[First time trying to get rewarded]' do
          context '[Campaign has a referrer_reward]' do
            it 'awards the referrer' do
              @campaign.update_attribute(:referrer_reward, @share_point_amount)

              @redemption.award_share_points!
              expect(@referrer_membership.reload.points).to eq @sum_point_amount
            end
          end

          context '[Campaign DOES NOT have a referrer_reward' do
            it 'does not award the referrer' do
              @campaign.update_attribute(:referrer_reward, 0)

              @redemption.award_share_points!
              expect(@referrer_membership.reload.points).to eq @original_point_amount
            end
          end

          context '[Campaign has a referral_reward]' do
            it 'awards the referral' do
              @campaign.update_attribute(:referral_reward, @share_point_amount)

              @redemption.award_share_points!
              expect(@referral_membership.reload.points).to eq @sum_point_amount
            end
          end

          context '[Campaign DOES NOT have a referral_reward' do
            it 'does not award the referral' do
              @campaign.update_attribute(:referral_reward, 0)

              @redemption.award_share_points!
              expect(@referral_membership.reload.points).to eq @original_point_amount
            end
          end

          context '[Campaign has NO REWARD]' do
            it 'awards nobody' do
              @campaign.update_attributes(referral_reward: 0, referrer_reward: 0)

              @redemption.award_share_points!
              expect(@referrer_membership.reload.points).to eq @original_point_amount
              expect(@referral_membership.reload.points).to eq @original_point_amount
            end
          end

          context '[Campaign REWARDS BOTH referrer and referral]' do
            it 'awards nobody' do
              @campaign.update_attributes(referral_reward: @share_point_amount, referrer_reward: @share_point_amount)

              @redemption.award_share_points!
              expect(@referrer_membership.reload.points).to eq @sum_point_amount
              expect(@referral_membership.reload.points).to eq @sum_point_amount
            end
          end
        end

        context '[Second time trying to be rewarded]' do
          before :each do
            @campaign.update_attributes(referral_reward: @share_point_amount, referrer_reward: @share_point_amount)
            @redemption.award_share_points!
          end

          it 'does not awards the referrer' do
            @campaign.update_attribute(:referrer_reward, @share_point_amount)

            @redemption.award_share_points!
            expect(@referrer_membership.reload.points).to eq @sum_point_amount
          end

          it 'does not awards the referral' do
            @campaign.update_attribute(:referral_reward, @share_point_amount)

            @redemption.award_share_points!
            expect(@referral_membership.reload.points).to eq @sum_point_amount
          end
        end
      end
    end
  end

  describe '#ensure_customer_has_enough_reward_points' do
    before :each do
      @location   = FactoryGirl.create(:location_with_business)
      @business   = @location.business
      @customer   = FactoryGirl.create(:customer)
      @customer_membership = FactoryGirl.create(:membership, business: @business, customer_id: @customer.id, points: 100)
      
      @campaign   = FactoryGirl.create(:reward, locations: [@location], reward_cost: 25)

    end

    context '[Has enough points]' do
      it 'decreases customer points' do
        @customer_membership.update_attribute(:points, 100)
        redemption = FactoryGirl.create(:redemption, campaign: @campaign, location: @location, customer: @customer)
        
        @customer_membership.reload
        expect(@customer_membership.points).to eq 75
      end
    end

    context '[Does not have enough points]' do
      it 'returns an error' do
        @customer_membership.update_attribute(:points, 20)
        redemption = FactoryGirl.create(:redemption, campaign: @campaign, location: @location, customer: @customer) rescue nil
        @customer_membership.reload

        expect(@customer_membership.points).to eq 20
        expect(redemption).to be_nil
      end
    end
  end

end
