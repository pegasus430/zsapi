class AddStatusAndActionToReceipts < ActiveRecord::Migration
  def change
    add_column :receipts, :status, 			:integer, 	null: false, 	length: 1, 	default: 0
    add_column :receipts, :actioned_on,	:datetime
  end
end
