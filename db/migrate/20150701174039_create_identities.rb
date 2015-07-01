class CreateIdentities < ActiveRecord::Migration
  def change
    create_table :identities do |t|
      t.references :user, index: true
      t.references :customer,   index: true
      t.string :provider,       null: false
      t.string :access_token,   null: false, index: true
      t.string :refresh_token
      t.string :uid,            null: false, index: true
      t.string :name
      t.string :email

      t.timestamps null: false
    end
    add_foreign_key :identities, :users
    add_foreign_key :identities, :customers
  end
end
