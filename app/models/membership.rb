class Membership < ActiveRecord::Base
  belongs_to :business
  belongs_to :customer
  belongs_to :campaign

  validates :points, numericality: { greater_than_or_equal_to: 0 }

  def set_new_welcome_reward_valid_at(wait_time)
    self[:welcome_reward_valid_at] = Time.now + wait_time.to_i
  end

  def set_new_exit_campaign_expires_at(wait_time)
    self[:exit_campaign_expires_at] = Time.now + wait_time.to_i
  end

  def can_receive_welcome_reward?
    welcome_reward_valid_at.nil? || Time.now >= welcome_reward_valid_at
  end

  def exit_campaign_valid?
    campaign && (exit_campaign_expires_at.nil? || Time.now < exit_campaign_expires_at)
  end
  
end