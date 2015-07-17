class AddEnumStatusToBusinesses < ActiveRecord::Migration
  def up
    add_column :businesses, :status, :integer, default: 0, null: false
    remove_column :businesses, :published
  end

  def down
    add_column :businesses, :published, :boolean, default: false
    remove_column :businesses, :status
  end
end
