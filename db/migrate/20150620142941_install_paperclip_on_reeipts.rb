class InstallPaperclipOnReeipts < ActiveRecord::Migration
  def up
  	remove_column :receipts, :image_filename
  	add_attachment :receipts, :image
  end

  def down
  	remove_attachment :receipts, :image
  	add_column :receipts, :image_filename, :string
  end
end
