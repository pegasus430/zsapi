class Visit < ActiveRecord::Base
  belongs_to :customer
  belongs_to :location

  validates_presence_of :updated_at

  before_save { |v| v.updated_at = Time.now }

  def self.create_or_increment(option={})
  	customer = option[:customer]
		location = option[:location]

  	visit = Visit.find_or_create_by(customer: customer, location: location)
  	visit.increment!(:total)
  end
end
