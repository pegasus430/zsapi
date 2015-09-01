class Beacon < ActiveRecord::Base
  enum status: [:inactive, :active]

  belongs_to :location
  has_one :payment, through: :location

  validates :uuid, presence: true

  def activate!
    active!
    location.active! if location.pending?
  end
end
