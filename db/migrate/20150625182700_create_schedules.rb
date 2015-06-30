class CreateSchedules < ActiveRecord::Migration
  def change
    create_table :schedules do |t|
      t.string :title, null: false
      t.integer :days_of_week, array: true, default: [0]
      t.integer :weeks_of_month, array: true, default: [0]
      t.integer :day_numbers, array: true, default: [0]
    end

    add_index  :schedules, :days_of_week, 	using: 'gin'
    add_index  :schedules, :weeks_of_month, using: 'gin'
    add_index  :schedules, :day_numbers, 		using: 'gin'
  end
end
