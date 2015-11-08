class Redemption < ActiveRecord::Base
	enum status: [:pending, :complete]
	
  belongs_to :campaign
  belongs_to :customer
  belongs_to :location
  has_one :receipt

  validates_presence_of :customer_id, :location_id

  scope :coupons, -> { includes(:campaign).where(campaigns: {type_of: 'coupons'}) }
  scope :rewards, -> { includes(:campaign).where(campaigns: {type_of: 'rewards'}) }
  scope :specials, -> { includes(:campaign).where(campaigns: {type_of: 'specials'}) }

  def award_points_to_customer!
  	customer.membership_for(location.business).increment!(:points, receipt.reward_points)
  end

  def award_points_to_referrer!
    if campaign.referrer_reward > 0
      referral_record = Referral.where(campaign: campaign, customer_id: customer.id, status: 'unused').first
      unless referral_record.nil?
        referral_record.referrer.membership_for(location.business).increment!(:points, campaign.referrer_reward)
        referral_record.used! # mark the referral row as used
        return true
      end
    end
    
    false
  end

  def award_points_to_referral!
    if campaign.referral_reward > 0
      referral_record = Referral.where(campaign: campaign, customer_id: customer.id, status: 'unused').first
      unless referral_record.nil?
        referral_record.customer.membership_for(location.business).increment!(:points, campaign.referral_reward)
        referral_record.used! # mark the referral row as used
        return true
      end
    end

    false
  end
end
