class RemovePurchaseDateFromPayment < ActiveRecord::Migration
  def up
  	remove_column :payments, :purchase_date
  end

  def down
  	add_column :payments, :purchase_date, :datetime
  end
end
