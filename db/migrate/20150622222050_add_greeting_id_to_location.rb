class AddGreetingIdToLocation < ActiveRecord::Migration
  def change
    add_reference :locations, :greeting, index: true
    add_foreign_key :locations, :greetings
  end
end
