class AddDeviceNotificationTokensToCustomers < ActiveRecord::Migration
  def change
    add_column :customers, :gcm_token, :string
    rename_column :customers, :notification_token, :ios_token
  end
end
