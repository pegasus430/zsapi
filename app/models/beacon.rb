require 'kontaktio'

class Beacon < ActiveRecord::Base
  enum status: [:processing, :shipped, :active]

  belongs_to :location
  has_one :subscription, through: :location

  validates :uuid, presence: true, confirmation: true, on: :update

  before_create :generate_random_key

  # Change the beacon and location status
  # also start the subscription
  def activate!
    active!
    location.active! if location.pending?
    subscription.start!
  end

  def kontaktio
    @kontaktio ||= Kontaktio.new(private_api_key: location.business.kontakt_api_key)
  end

  def device
    kontaktio.device_by_unique_id(unique_id) rescue nil
  end

  def battery_level
    kontaktio.device_status(unique_id) rescue nil
  end


  private

  	def generate_random_key
  		self[:creation_key] = SecureRandom.hex(15)
  		self[:creation_key]
		end
end
