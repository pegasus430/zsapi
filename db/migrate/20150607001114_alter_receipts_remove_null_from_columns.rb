class AlterReceiptsRemoveNullFromColumns < ActiveRecord::Migration
  def up
  	change_column_null :receipts, :purchased_on, true
  	change_column_null :receipts, :amount, true
  end

  def down
  	change_column_null :receipts, :purchased_on, false
  	change_column_null :receipts, :amount, false
  end
end
