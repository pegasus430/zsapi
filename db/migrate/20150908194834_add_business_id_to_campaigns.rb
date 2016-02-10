class AddBusinessIdToCampaigns < ActiveRecord::Migration
  def change
    add_reference :campaigns, :business, index: true
    add_foreign_key :campaigns, :businesses
  end
end
