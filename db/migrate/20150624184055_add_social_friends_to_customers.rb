class AddSocialFriendsToCustomers < ActiveRecord::Migration
  def change
    add_column :customers, :social_friends, :text
  end
end
