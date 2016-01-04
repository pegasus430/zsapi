class AddUidToBeacon < ActiveRecord::Migration
  def change
    add_column :beacons, :uid, :string
  end
end
