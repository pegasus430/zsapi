class Order < ActiveRecord::Base
  belongs_to :location
  belongs_to :beacon

  validates_presence_of :status
end
