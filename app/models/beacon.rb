require 'kontaktio'

class Beacon < ActiveRecord::Base
  enum status: [:processing, :shipped, :active]

  belongs_to :location
  has_one :subscription, through: :location

  validates :uid, presence: true, confirmation: true, on: :update

  before_create :generate_random_key

  # Change the beacon and location status
  # also start the subscription
  def activate!
    active!
    location.active! if location.pending?
    subscription.start!
  end

  def kontaktio
    @kontaktio ||= Kontaktio.new(private_api_key: ENV['KONTAKT_API_KEY'])
  end

  def device
    kontaktio.device_by_unique_id(uid) rescue nil
  end

  def battery_level
    kontaktio.device_status(uid) rescue nil
  end


  private

  	def generate_random_key
  		self[:creation_key] = SecureRandom.hex(15)
  		self[:creation_key]
		end
end
