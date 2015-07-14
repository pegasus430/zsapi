class RenameWalletsToMemberships < ActiveRecord::Migration
  def up
  	rename_table :wallets, :memberships

    add_column :memberships, :last_visit_at, :datetime
  	add_column :memberships, :welcome_reward_valid_at, :datetime
  	add_column :memberships, :last_exit_at, :datetime
  	add_column :memberships, :exit_campaign_id, :integer
  	add_column :memberships, :exit_campaign_expires_at, :datetime
  	add_column :memberships, :notified, :boolean, default: false, null: false

  	add_foreign_key :memberships, :campaigns, column: :exit_campaign_id

  	# Remove the "contacted" from customers since it is per membership
  	remove_column :customers, :contacted
  end

  def down
  	remove_foreign_key :memberships, :campaigns

  	remove_column :memberships, :last_visit_at
    remove_column :memberships, :welcome_reward_valid_at
  	remove_column :memberships, :last_exit_at
  	remove_column :memberships, :exit_campaign_id
  	remove_column :memberships, :exit_campaign_expires_at
  	remove_column :memberships, :notified

  	add_column :customers, :contacted, :boolean, default: false, null: false

  	rename_table :memberships, :wallets
  end
end
