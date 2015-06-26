class CreateCampaigns < ActiveRecord::Migration
  def change
    create_table :campaigns do |t|
      t.integer :type_of, null: false
      t.string :title, null: false
      t.decimal :discount_amount, null: false, default: 0
      t.integer :discount_type, null: false, default: 0
      t.integer :share_reward
      t.attachment :image
      t.boolean :featured, null: false, default: false
      t.boolean :status, null: false, default: false
      t.references :schedule, index: true
      t.datetime :start_at, null: false
      t.datetime :end_at

      t.timestamps null: false
    end
    add_foreign_key :campaigns, :schedules
  end
end
