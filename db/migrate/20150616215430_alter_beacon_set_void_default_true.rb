class AlterBeaconSetVoidDefaultTrue < ActiveRecord::Migration
  def up
  	change_column :beacons, :void, :boolean, deafault: true
  end

  def down
  	change_column :beacons, :void, :boolean, deafault: false
  end
end
