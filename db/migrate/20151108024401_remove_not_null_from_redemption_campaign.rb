class RemoveNotNullFromRedemptionCampaign < ActiveRecord::Migration
  def change
  	change_column :redemptions, :campaign_id, :integer, null: true 
  end
end
