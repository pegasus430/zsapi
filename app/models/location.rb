class Location < ActiveRecord::Base
  belongs_to :business
  belongs_to :beacon
  has_many :customers, through: :visits
  has_many :orders
  has_many :receipts
  has_many :visits

  # accepts_nested_attributes_for :notifications, allow_destroy: true

  validates_presence_of :address, :city, :state, :zipcode
  validates_length_of :state, is: 2

  before_save { |l| l.title = l.address + " Location" if l.title.nil? }

  def self.active
  	Location.where('beacon_id IS NOT NULL')
  end

  def self.pending
  	Location.where(beacon: nil)
  end

  def pending?
  	beacon.nil?
  end

  def full_address(params = {})
  	if params[:multiline]
  		params[:newline] ||= "<br>"

  		the_address = "#{address}" + params[:newline]
  		the_address += "#{address2}" + params[:newline] unless address2.blank?
  	else
  		the_address = "#{address} "
  		the_address += "#{address2}, " unless address2.blank?
  	end

		the_address += "#{city}, #{state} #{zipcode}"
		the_address
  end
end
