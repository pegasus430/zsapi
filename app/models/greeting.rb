class Greeting < ActiveRecord::Base
	enum exit_freq_type: [:days, :weeks, :months]
	enum welcome_reward_freq: [:daily, :weekly, :monthly]

	DAYS 		= 0
	WEEKS 	= 1
	MONTHS 	= 2

	has_one :location
  # belongs_to :campaign, class_name: "Campaign", foreign_key: :exit_campaign_id

  validates_presence_of :welcome_message, :exit_message
  validates :exit_freq_days, numericality: { greater_than: 0 }, if: "exit_campaign_id == 0"
end
