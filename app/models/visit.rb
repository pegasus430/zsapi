class Visit < ActiveRecord::Base
  belongs_to :customer
  belongs_to :location

  validates_presence_of :created_at

  # before_create { |v| v.created_at = Time.now }
end
