require 'securerandom'

class Payment < ActiveRecord::Base
  enum status: [:processing, :shipped, :received]

  belongs_to :location
  has_one :business, through: :location
  has_one :beacon, through: :location

  validates_presence_of :status


end
