class AddReferralRewardToCampaign < ActiveRecord::Migration
  def change
    rename_column :campaigns, :share_reward, :referrer_reward
    add_column :campaigns, :referral_reward, :integer, default: 0
  end
end
