class Beacon < ActiveRecord::Base
  enum status: [:inactive, :active]

  belongs_to :location
  has_one :payment, through: :location

  validates_presence_of :uuid

  def activate!
    active!
  end
end
