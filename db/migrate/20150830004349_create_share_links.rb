class CreateShareLinks < ActiveRecord::Migration
  def change
    create_table :share_links do |t|
      t.references  :campaign,    index: true
      t.references  :customer,    index: true
      t.string      :code,        index: true,  unique: true,   null: false
      t.datetime    :created_at,  null: false
    end
    add_foreign_key :share_links, :campaigns
    add_foreign_key :share_links, :customers
  end
end
