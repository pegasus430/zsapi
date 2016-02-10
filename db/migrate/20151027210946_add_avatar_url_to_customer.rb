class AddAvatarUrlToCustomer < ActiveRecord::Migration
  def change
    add_column :customers, :avatar_url, :string, null: true
  end
end
