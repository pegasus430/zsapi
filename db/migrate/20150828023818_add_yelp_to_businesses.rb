class AddYelpToBusinesses < ActiveRecord::Migration
  def change
    add_column :businesses, :yelp_url, :string
  end
end
