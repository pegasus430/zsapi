class RenameOrdersToPayments < ActiveRecord::Migration
  def up
  	rename_table :orders, :payments
  	rename_column :beacons, :order_id, :payment_id
  end

  def down
  	rename_table :payments, :orders
  	rename_column :beacons, :payment_id, :order_id
  end
end
