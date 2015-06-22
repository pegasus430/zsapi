class Location < ActiveRecord::Base
  belongs_to :business
  has_one :beacon
  has_one :payment
  has_one :user, through: :business
  has_many :customers, through: :visits
  has_many :receipts
  has_many :visits

  # accepts_nested_attributes_for :notifications, allow_destroy: true

  validates_presence_of :address, :city, :state, :zipcode
  validates_length_of :state, is: 2

  before_save { |l| l.title = l.address + " Location" if l.title.nil? }

  geocoded_by :full_address
  after_validation :geocode, on: [:create], if: Proc.new { |l| l.address.present? && l.address2 != 'ignore' }

  def self.active
  	Location.joins(:beacon)
  end

  def self.pending
  	Location.includes(:beacon).where(beacons: {id: nil})
  end

  def active?
    !beacon.nil? && beacon.active?
  end

  def pending?
  	beacon.nil? || beacon.void?
  end

  def full_address(params = {})
  	if params[:multiline]
  		params[:newline] ||= "<br>"

  		the_address = "#{address}" + params[:newline]
  		the_address += "#{address2}" + params[:newline] unless address2.blank?
  	else
  		the_address = "#{address}, "
  		the_address += "#{address2}, " unless address2.blank?
  	end

		the_address += "#{city}, #{state} #{zipcode}"
		the_address
  end

  def full_address_changed?
    address_changed? || city_changed? || state_changed? || zipcode_changed?
  end
end
