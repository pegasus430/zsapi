class RemovePointsFromCustomers < ActiveRecord::Migration
  def up
  	remove_column :customers, :points
  end

  def down
  	add_column :customers, :points, :integer, null: false,  default: 0
  end
end
