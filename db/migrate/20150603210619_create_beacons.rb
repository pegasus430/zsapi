class CreateBeacons < ActiveRecord::Migration
  def change
    create_table :beacons do |t|
      t.integer :location_id, index: true
      t.integer :order_id, index: true
      t.string :uuid
      t.boolean :void, default: false

      t.timestamps null: false
    end
    # add_foreign_key :beacons, :locations
    # add_foreign_key :beacons, :orders
  end
end
