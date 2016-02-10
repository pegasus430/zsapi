class CreateLocationCampaignJoinTable < ActiveRecord::Migration
  def change
    create_join_table :locations, :campaigns do |t|
      # t.index [:location_id, :campaign_id]
      # t.index [:campaign_id, :location_id]
    end
  end
end
