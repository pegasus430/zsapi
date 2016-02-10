class AddStatusToRedemption < ActiveRecord::Migration
  def change
    add_column :redemptions, :status, :integer, default: 0, null: false
  end
end
