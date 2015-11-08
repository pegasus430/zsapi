class AddRewardCostToCampaigns < ActiveRecord::Migration
  def change
    add_column :campaigns, :reward_cost, :integer, default: 0, null: false
  end
end
