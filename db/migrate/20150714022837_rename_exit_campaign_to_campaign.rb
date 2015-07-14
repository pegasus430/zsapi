class RenameExitCampaignToCampaign < ActiveRecord::Migration
  def change
  	rename_column :greetings, :exit_campaign_id, :campaign_id
  	add_foreign_key :greetings, :campaigns
  end
end
