class Location < ActiveRecord::Base
  belongs_to :business
  belongs_to :beacon
  has_many :customers, through: :visits
  has_many :receipts
  has_many :visits

  validates_presence_of :address, :city, :state, :zipcode
  validates_length_of :state, is: 2

  def self.active
  	Location.where('beacon_id IS NOT NULL')
  end

  def self.pending
  	Location.where(beacon: nil)
  end

  def pending?
  	beacon.nil?
  end
end
