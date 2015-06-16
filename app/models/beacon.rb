class Beacon < ActiveRecord::Base
  belongs_to :location
  has_one :payment, through: :location

  validates_presence_of :uuid

  def active?
  	!void?
  end

  def activate!
  	self[:void] = false
  	save
  end
end
