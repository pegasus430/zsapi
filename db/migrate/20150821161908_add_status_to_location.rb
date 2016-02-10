class AddStatusToLocation < ActiveRecord::Migration
  def change
    add_column :locations, :status, :integer, default: 0, null: false
  end
end
