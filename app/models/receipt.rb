class Receipt < ActiveRecord::Base
  enum status: [:untouched, :approved, :rejected]

  belongs_to :location
  belongs_to :redemption

  validates_presence_of :location_id
  validates_presence_of :redemption_id
  validates_presence_of :amount, :purchased_on, on: [:update]
  validates_presence_of :reject_reason, if: "status == 'rejected'"

  has_attached_file :image, :styles => { :medium => "500x500" }
  validates_attachment_presence :image
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  scope :from_today, -> {
    where( updated_at: (Date.today)..(Date.today + 23.hours + 59.minutes + 59.seconds) )
  }


  def self.reject_reasons
    {
      invalid_location: "The location does not match the receipt.",
      invalid_location: "The location does not match the receipt.",
    }
  end

  def reward_points
    amount.floor.to_i
  end



end