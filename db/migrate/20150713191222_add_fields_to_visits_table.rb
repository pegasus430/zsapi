class AddFieldsToVisitsTable < ActiveRecord::Migration
  def up
    remove_column :memberships, :last_visit_at
    remove_column :memberships, :last_exit_at

    remove_column :visits, :created_at
  	add_column :visits, :last_visit_at, :datetime
    add_column :visits, :last_exit_at, :datetime
    add_column :visits, :total, :integer

    add_foreign_key :visits, :customers
    add_foreign_key :visits, :locations
  end

  def down
    remove_foreign_key :visits, :customers
    remove_foreign_key :visits, :locations

    add_column :memberships, :last_visit_at, :datetime
    add_column :memberships, :last_exit_at, :datetime

    add_column :visits, :created_at, :datetime
    remove_column :visits, :last_visit_at
    remove_column :visits, :last_exit_at
    add_column :visits, :total
  end
end
