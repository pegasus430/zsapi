class RemoveLocationFromReceipts < ActiveRecord::Migration
	def up
		remove_column :receipts, :location_id
	end

  def down
  	add_reference :receipts, :location, index: true
  	add_foreign_key :receipts, :locations
  end
end
