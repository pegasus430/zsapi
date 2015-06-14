require 'securerandom'

class Payment < ActiveRecord::Base
	# Statuses
	PROCESSING 	= 0
	SHIPPED 		= 1
	RECEIVED 		= 2

  belongs_to :location
  has_one :business, through: :location
  has_one :beacon

  validates_presence_of :status

  before_create :generate_random_key


  private

  	def generate_random_key
  		self[:key] = SecureRandom.hex(15)
  		self[:key]
		end
end
