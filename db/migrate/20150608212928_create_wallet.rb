class CreateWallet < ActiveRecord::Migration
  def change
    create_table :wallets do |t|
      t.references :business, index: true
      t.references :customer, index: true
      t.integer :points,	null: false,  default: 0
    end
    add_foreign_key :wallets, :businesses
    add_foreign_key :wallets, :customers
  end
end
