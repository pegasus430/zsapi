class AddPosAndDescToCampaigns < ActiveRecord::Migration
  def change
    add_column :campaigns, :pos, :string
    add_column :campaigns, :description, :string
  end
end
