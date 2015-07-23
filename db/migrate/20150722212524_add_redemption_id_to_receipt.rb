class AddRedemptionIdToReceipt < ActiveRecord::Migration
  def change
    add_reference :receipts, :redemption, index: true
    add_foreign_key :receipts, :redemptions
  end
end
