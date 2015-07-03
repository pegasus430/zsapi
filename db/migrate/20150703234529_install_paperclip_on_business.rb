class InstallPaperclipOnBusiness < ActiveRecord::Migration
  def up
  	remove_column :businesses, :logo_filename
  	add_attachment :businesses, :image
  end

  def down
  	remove_attachment :businesses, :image
  	add_column :businesses, :logo_filename, :string
  end
end
