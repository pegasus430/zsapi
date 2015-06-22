class ChangeLatLonToFloat < ActiveRecord::Migration
  def up
  	execute("ALTER TABLE locations ALTER COLUMN latitude TYPE float USING (latitude::float)")
  	execute("ALTER TABLE locations ALTER COLUMN latitude set default 0")

  	execute("ALTER TABLE locations ALTER COLUMN longitude TYPE float USING (longitude::float)")
  	execute("ALTER TABLE locations ALTER COLUMN longitude set default 0")

  	add_index :locations, :latitude
  	add_index :locations, :longitude
  end

  def down
  	change_column :locations, :latitude, :string
  	change_column :locations, :longitude, :string
  	remove_index :locations, :latitude
  	remove_index :locations, :longitude
  end
end
