class CreateLocationPictures < ActiveRecord::Migration
  def change
    create_table :location_pictures do |t|
      t.string :name
      t.references :location, index: true
      t.attachment :image

      t.timestamps null: false
    end
    add_foreign_key :location_pictures, :locations
  end
end
