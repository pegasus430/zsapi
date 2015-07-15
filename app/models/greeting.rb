class Greeting < ActiveRecord::Base
	has_many :locations
  belongs_to :campaign
  belongs_to :business

  validates_presence_of :welcome_message, :exit_message
  validates :campaign_wait_time, numericality: { greater_than: 0 }, unless: "campaign_id.to_i == 0"

  def welcome_wait_time=(duration)
  	time_span = case duration
  	when 'day' then 1.day
  	when 'week' then 1.week
  	when 'month' then 1.month
  	end

  	self[:welcome_wait_time] = time_span.to_i
  end
end
