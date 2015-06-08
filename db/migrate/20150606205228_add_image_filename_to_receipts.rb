class AddImageFilenameToReceipts < ActiveRecord::Migration
  def change
    add_column :receipts, :image_filename, :string
  end
end
