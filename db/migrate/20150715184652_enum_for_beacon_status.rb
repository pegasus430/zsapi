class EnumForBeaconStatus < ActiveRecord::Migration
  def up
  	remove_column :beacons, :void
  	add_column :beacons, :status, :integer, default: 0, null: false
  end

  def down
  	remove_column :beacons, :status
  	add_column :beacons, :void, :boolean, default: false
  end
end
