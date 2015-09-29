class Redemption < ActiveRecord::Base
	enum status: [:pending, :complete]
	
  belongs_to :campaign
  belongs_to :customer
  belongs_to :location
  has_one :receipt

  validates_presence_of :campaign, :customer_id, :location

  def award_points_to_customer!
  	customer.membership_for(location.business).increment!(:points, receipt.reward_points)
  end

  def award_points_to_referrer!
    ref = Referral.where(campaign: campaign, customer_id: customer.id, status: 'unused').first
    unless ref.nil?
      ref.referrer.membership_for(location.business).increment!(:points, campaign.share_reward)
      ref.used! # mark the referral row as used
      return true
    end

    false
  end
end
