class CreateGreetings < ActiveRecord::Migration
  def change
    create_table :greetings do |t|
      t.string :welcome_message
      t.integer :welcome_reward
      t.integer :welcome_reward_freq, length: 1, default: 0
      t.string :exit_message
      t.integer :exit_campaign_id, index: true
      t.integer :exit_freq_days
      t.integer :exit_freq_type, length: 1, default: 0

      t.timestamps null: false
    end
    # add_foreign_key :greetings, :exit_campaign_ids
  end
end
