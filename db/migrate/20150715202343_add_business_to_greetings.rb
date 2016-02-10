class AddBusinessToGreetings < ActiveRecord::Migration
  def change
    add_reference :greetings, :business, index: true
    add_foreign_key :greetings, :businesses
  end
end
