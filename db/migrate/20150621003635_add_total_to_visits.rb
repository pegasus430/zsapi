class AddTotalToVisits < ActiveRecord::Migration
  def change
    add_column :visits, :total, :integer, default: 0
    rename_column :visits, :created_at, :updated_at
  end
end
