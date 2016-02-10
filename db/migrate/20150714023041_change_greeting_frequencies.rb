class ChangeGreetingFrequencies < ActiveRecord::Migration
  def up
  	remove_column :greetings, :exit_freq_type
  	remove_column :greetings, :exit_freq_days
  	remove_column :greetings, :welcome_reward_freq

  	add_column :greetings, :campaign_wait_time, :integer, default: 0, null: false
  	add_column :greetings, :welcome_wait_time, :integer, default: 0, null: false
  end

  def down
  	add_column :greetings, :exit_freq_type, :integer, default: 0, null: false
  	add_column :greetings, :exit_freq_days, :integer, default: 0, null: false
  	add_column :greetings, :welcome_reward_freq, :integer, default: 0, null: false

  	remove_column :greetings, :campaign_wait_time
  	remove_column :greetings, :welcome_wait_time
  end
end
