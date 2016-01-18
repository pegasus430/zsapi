class Redemption < ActiveRecord::Base
  include TimeFilterable

	enum status: [:pending, :complete]
	
  belongs_to :campaign
  belongs_to :customer
  belongs_to :location
  has_one :receipt

  validates_presence_of :customer_id, :location_id

  before_save :ensure_customer_has_enough_reward_points, if: -> { campaign.present? }

  scope :coupons, -> { includes(:campaign).where(campaigns: {type_of: 'coupons'}) }
  scope :rewards, -> { includes(:campaign).where(campaigns: {type_of: 'rewards'}) }
  scope :specials, -> { includes(:campaign).where(campaigns: {type_of: 'specials'}) }

  def award_points_to_customer!
  	customer.membership_for(location.business).increment!(:points, receipt.reward_points)

    customer.create_push_notification(
      alert: "#{location.business.name} has accepted your receipt! You earned #{receipt.reward_points} points!",
      deliver_now: true
    )
  end

  def award_points_to_referrer!
    unless campaign.blank?
      if campaign.referrer_reward > 0
        referral_record = Referral.where(campaign: campaign, customer_id: customer.id, status: 'unused').first
        unless referral_record.nil?
          referral_record.referrer.membership_for(location.business).increment!(:points, campaign.referrer_reward)
          referral_record.used! # mark the referral row as used
          return true
        end
      end
    end
    
    false
  end

  def award_points_to_referral!
    unless campaign.blank?
      if campaign.referral_reward > 0
        referral_record = Referral.where(campaign: campaign, customer_id: customer.id, status: 'unused').first
        unless referral_record.nil?
          referral_record.customer.membership_for(location.business).increment!(:points, campaign.referral_reward)
          referral_record.used! # mark the referral row as used
          return true
        end
      end
    end

    false
  end

  private

    def ensure_customer_has_enough_reward_points
      unless campaign.blank?
        if campaign.reward?
          if customer.membership_for(location.business).points >= campaign.reward_cost
            customer.membership_for(location.business).decrement!(:points, campaign.reward_cost)
          else
            errors.add :base, "You do not have enough points to redeem this reward"
            false
          end
        end
      end
    end
end
