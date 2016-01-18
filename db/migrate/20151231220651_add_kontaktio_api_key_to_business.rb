class AddKontaktioApiKeyToBusiness < ActiveRecord::Migration
  def change
    add_column :businesses, :kontakt_api_key, :string
  end
end
