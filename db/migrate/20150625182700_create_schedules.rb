class CreateSchedules < ActiveRecord::Migration
  def change
    create_table :schedules do |t|
      t.string :title, null: false
      t.text :days_of_week, array: true, default: []
      t.text :weeks_of_month, array: true, default: []
      t.text :day_numbers, array: true, default: []
    end
  end
end
