class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.integer :stripe_sub_id
      t.integer :stripe_plan_id, null: false
      t.datetime :next_billing_at
      t.references :location, index: true, null: false

      t.timestamps null: false
    end
    add_foreign_key :subscriptions, :locations
  end
end
