class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.integer :user_id,         index: true
      t.string :name,             null: false
      t.boolean :published,       default: false
      t.string :logo_filename
      t.string :primary_color,    length: 6
      t.string :secondary_color,  length: 6
      t.string :website
      t.string :facebook
      t.string :twitter,          length: 15

      t.timestamps null: false
    end

    # add_foreign_key :businesses, :users
  end
end
