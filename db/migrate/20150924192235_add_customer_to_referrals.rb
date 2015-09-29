class AddCustomerToReferrals < ActiveRecord::Migration
  def change
    add_reference :referrals, :customer, index: true, null: false
    add_foreign_key :referrals, :customers
  end
end
