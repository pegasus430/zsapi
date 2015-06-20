class AddTokensToCustomers < ActiveRecord::Migration
  def change
    add_column :customers, :social_token, :string
    add_column :customers, :notification_token, :string
  end
end
