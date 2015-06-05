class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer :business_id, index: true
      t.integer :beacon_id, index: true
      t.string :title,    null: false
      t.string :address,  null: false
      t.string :address2
      t.string :city,     null: false
      t.string :state,    null: false,  length: 2
      t.string :zipcode,  null: false

      t.timestamps null: false
    end
    # add_foreign_key :locations, :businesses
    # add_foreign_key :locations, :beacons
  end
end
