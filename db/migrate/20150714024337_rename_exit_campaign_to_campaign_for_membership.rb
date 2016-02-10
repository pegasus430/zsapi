class RenameExitCampaignToCampaignForMembership < ActiveRecord::Migration
  def change
  	rename_column :memberships, :exit_campaign_id, :campaign_id
  	add_foreign_key :memberships, :campaigns
  end
end
