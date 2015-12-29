class AddWaitTimeFieldsToGreetings < ActiveRecord::Migration
  def change
    add_column :greetings, :campaign_wait_time_quantity, :integer, default: 0
    add_column :greetings, :campaign_wait_time_span, :string, default: "days"
  end
end
