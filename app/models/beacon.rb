class Beacon < ActiveRecord::Base
  belongs_to :location
  belongs_to :order

  validates_presence_of :uuid
end
