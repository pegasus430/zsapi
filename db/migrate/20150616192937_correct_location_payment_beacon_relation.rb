class CorrectLocationPaymentBeaconRelation < ActiveRecord::Migration
  def up
  	remove_column :beacons, :payment_id
  	remove_column :locations, :beacon_id
  end

  def down
  	add_column :beacons, :payment_id, :integer, index: true
  	add_column :locations, :beacon_id, :integer, index: true
  end
end
