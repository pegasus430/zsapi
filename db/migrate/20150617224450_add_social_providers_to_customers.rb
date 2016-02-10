class AddSocialProvidersToCustomers < ActiveRecord::Migration
  def change
    add_column :customers, :social_type, :string
    add_column :customers, :social_id, :string
  end
end
