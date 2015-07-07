class ChangeCampaignStatusToEnum < ActiveRecord::Migration
  def up
  	remove_column :campaigns, :status
  	add_column :campaigns, :status, :integer, null: false, index: true, default: 0
  end

  def down
  	remove_column :campaigns, :status
  	add_colimn :campaigns, :status, null: false, default: false
  end
end
