class AddSocialTokensToCustomers < ActiveRecord::Migration
  def change
    add_column :customers, :fb_id, :string
    add_column :customers, :gp_id, :string
  end
end
