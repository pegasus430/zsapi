class RemoveOldStatusFieldsFromReceipts < ActiveRecord::Migration
	def up
		remove_column :receipts, :approved_on
		remove_column :receipts, :rejected_on
	end

	def down
    add_column :receipts, :approved_on,	:date
    add_column :receipts, :rejected_on,	:date
	end
end
