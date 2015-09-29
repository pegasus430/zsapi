class RemoveActionedOnFromReceipts < ActiveRecord::Migration
  def change
  	remove_column :receipts, :actioned_on
  end
end
