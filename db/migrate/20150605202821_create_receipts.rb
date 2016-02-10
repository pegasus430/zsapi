class CreateReceipts < ActiveRecord::Migration
  def change
    create_table :receipts do |t|
      t.references :location, index: true
      t.date :purchased_on, null: false
      t.decimal :amount, null: false, precision: 8, scale: 2
      t.date :approved_on
      t.date :rejected_on
      t.string :reject_reason

      t.timestamps null: false
    end
    add_foreign_key :receipts, :locations
  end
end
