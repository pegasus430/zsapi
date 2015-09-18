class AddCreationKeyToBeacons < ActiveRecord::Migration
  def change
    add_column :beacons, :creation_key, :string, index: true
  end
end
