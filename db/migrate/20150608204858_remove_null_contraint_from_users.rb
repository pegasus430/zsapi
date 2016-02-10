class RemoveNullContraintFromUsers < ActiveRecord::Migration
  def up
  	change_column_null :users, :first_name, true
  	change_column_null :users, :last_name, true
  end

  def down
  	change_column_null :users, :first_name, false
  	change_column_null :users, :last_name, false
  end
end