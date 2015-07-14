class Greeting < ActiveRecord::Base
	has_many :locations
  belongs_to :campaign

  validates_presence_of :welcome_message, :exit_message
  validates :campaign_wait_time, numericality: { greater_than: 0 }, unless: "campaign_id.to_i == 0"
end
