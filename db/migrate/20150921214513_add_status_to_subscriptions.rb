class AddStatusToSubscriptions < ActiveRecord::Migration
  def change
    add_column :subscriptions, :status, :integer, null: false, default: 0
  end
end
