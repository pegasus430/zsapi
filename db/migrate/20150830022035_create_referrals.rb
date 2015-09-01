class CreateReferrals < ActiveRecord::Migration
  def change
    create_table :referrals do |t|
      t.references :referrer, index: true, null: false
      t.references :campaign, index: true, null: false
      t.references :share_link, index: true, null: false

      t.timestamps null: false
    end
    add_foreign_key :referrals, :customers, column: :referrer_id
    add_foreign_key :referrals, :campaigns
    add_foreign_key :referrals, :share_links
  end
end
