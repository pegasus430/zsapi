class RemovePaymentsTable < ActiveRecord::Migration
  def change
  	drop_table :payments
  end
end
