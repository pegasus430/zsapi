class Greeting < ActiveRecord::Base
  include Locationable
  
	has_many :locations, dependent: :nullify
  belongs_to :campaign
  belongs_to :business

  attr_accessor :campaign_wait_time_quantity, :campaign_wait_time_span
  before_validation :generate_campaign_wait_time!

  validates_presence_of :welcome_message, :exit_message
  validates :campaign_wait_time, numericality: { greater_than: 0 }, unless: "campaign_id.to_i == 0"
  validates :welcome_wait_time, numericality: { greater_than: 0 }

  def welcome_wait_time=(span)
  	time_span = case span
  	when 'day' 		then 1.day
  	when 'week' 	then 1.week
  	when 'month' 	then 1.month
    else 1.day
  	end

  	self[:welcome_wait_time] = time_span.to_i
  end


  private
    def generate_campaign_wait_time!
    	quantity = (campaign_wait_time_quantity.to_i > 0) ? campaign_wait_time_quantity.to_i : 1
    	span	   = (%w(day days week weeks month months).include?(campaign_wait_time_span)) ? campaign_wait_time_span : 'days'

    	time_span = case span
    	when 'day', 	'days' 		then 1.day.to_i
    	when 'week', 	'weeks' 	then 1.week.to_i
    	when 'month', 'months' 	then 1.month.to_i
    	end

    	self[:campaign_wait_time] = quantity * time_span
    end
end
