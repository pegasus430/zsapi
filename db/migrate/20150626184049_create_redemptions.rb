class CreateRedemptions < ActiveRecord::Migration
  def change
    create_table :redemptions do |t|
      t.references :campaign, index: true, null: false
      t.references :customer, index: true, null: false
      t.references :location, index: true, null: false
      t.datetime :created_at, null: false
    end
    add_foreign_key :redemptions, :campaigns
    add_foreign_key :redemptions, :customers
    add_foreign_key :redemptions, :locations
  end
end
