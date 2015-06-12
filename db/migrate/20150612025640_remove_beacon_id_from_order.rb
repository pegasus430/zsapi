class RemoveBeaconIdFromOrder < ActiveRecord::Migration
  def up
  	remove_column :orders, :beacon_id
  end

  def down
    add_column :orders, :beacon_id, :integer, index: true
  end
end
