class Visit < ActiveRecord::Base
  belongs_to :customer
  belongs_to :location

  validates_presence_of :created_at
end
