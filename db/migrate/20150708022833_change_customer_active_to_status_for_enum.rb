class ChangeCustomerActiveToStatusForEnum < ActiveRecord::Migration
  def up
  	remove_column :customers, :active
  	add_column :customers, :status, :integer, null: false, index: true, default: 0
  end

  def down
  	remove_column :customers, :status
  	add_column :customers, :active, :boolean, null: false, default: false
  end
end
