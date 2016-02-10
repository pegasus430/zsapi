class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.integer :location_id, index: true
      t.integer :beacon_id, index: true
      t.string :buyer_ip,         null: false
      t.datetime :purchase_date,  null: false
      t.string :transaction_id,   null: false,  unique: true
      t.string :key,              null: false
      t.integer :status,          length: 1,    default: 0  # 0 = Processing. 1 = Shipped. 2 = Received and entered.

      t.timestamps null: false
    end
    # add_foreign_key :orders, :locations
    # add_foreign_key :orders, :beacons
  end
end
