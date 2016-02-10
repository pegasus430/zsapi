class CreateVisits < ActiveRecord::Migration
  def change
    create_table :visits do |t|
      t.references :customer, index: true, null: false
      t.references :location, index: true, null: false
      t.datetime :created_at, null: false
    end
    add_foreign_key :visits, :customers
    add_foreign_key :visits, :locations
  end
end
