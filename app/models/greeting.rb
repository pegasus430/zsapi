class Greeting < ActiveRecord::Base
  include Locationable
  
  has_many :locations, dependent: :nullify
  belongs_to :campaign
  belongs_to :business

  before_validation :generate_campaign_wait_time!

  validates_presence_of :welcome_message, :exit_message
  validates :campaign_wait_time, numericality: { greater_than: 0 }, unless: "campaign_id.to_i == 0"
  validates :welcome_wait_time, numericality: { greater_than: 0 }
  validates :welcome_message, :exit_message, length: {maximum: 35}


  def welcome_wait_time
    %w(month week day).each do |span|
      if self[:welcome_wait_time] % 1.send(span) == 0
        return span
      end
    end

    # Default
    'day'
  end


  def welcome_wait_time=(span)
    time_span = case span
    when 'day'    then 1.day
    when 'week'   then 1.week
    when 'month'  then 1.month
    else 1.day
    end

    self[:welcome_wait_time] = time_span.to_i
  end


  private
    def generate_campaign_wait_time!
      quantity = (self[:campaign_wait_time_quantity].to_i > 0) ? self[:campaign_wait_time_quantity].to_i : 1
      span     = (%w(day days week weeks month months).include?(self[:campaign_wait_time_span])) ? self[:campaign_wait_time_span] : 'days'

      time_span = case span
      when 'day',   'days'    then quantity.day.to_i
      when 'week',  'weeks'   then quantity.week.to_i
      when 'month', 'months'  then quantity.month.to_i
      end

      self[:campaign_wait_time] = time_span
    end
end
