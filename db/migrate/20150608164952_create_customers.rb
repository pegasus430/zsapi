class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string :first_name,   null: false
      t.string :last_name,    null: false
      t.string :email,        null: false
      t.integer :points,      null: false,  default: 0
      t.boolean :active,      null: false,  default: false
      t.boolean :contacted,   null: false,  default: false

      t.timestamps null: false
    end

    add_index :customers, :active
    add_index :customers, :contacted
  end
end
