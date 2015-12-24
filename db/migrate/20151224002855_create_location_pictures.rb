class CreateLocationPhotos < ActiveRecord::Migration
  def change
    create_table :location_photos do |t|
      t.string :name
      t.references :location, index: true
      t.attachment :image

      t.timestamps null: false
    end
    add_foreign_key :location_photos, :locations
  end
end