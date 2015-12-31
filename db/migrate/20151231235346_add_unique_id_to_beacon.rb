class AddUniqueIdToBeacon < ActiveRecord::Migration
  def change
    add_column :beacons, :unique_id, :string
  end
end
