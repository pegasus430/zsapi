class Redemption < ActiveRecord::Base
  belongs_to :campaign
  belongs_to :customer
  belongs_to :location

  validates_presence_of :campaign, :customer, :location
end
