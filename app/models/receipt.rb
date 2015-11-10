class Receipt < ActiveRecord::Base
  enum status: [:untouched, :approved, :rejected]

  belongs_to :redemption

  validates_presence_of :redemption_id
  validates_presence_of :amount, :purchased_on, on: [:update]
  validates_presence_of :reject_reason, if: "status == 'rejected'"

  has_attached_file :image,
                    styles: { medium: '500x500#' }
  validates_attachment_presence :image
  validates_attachment_content_type :image,
                                    content_type: ["image/jpeg", "image/gif", "image/png"]


  scope :from_today, -> {
    where( updated_at: (Date.today)..(Date.today + 23.hours + 59.minutes + 59.seconds) )
  }


  def self.reject_reasons
    [
      {id: 'expired',           label: 'Date invalid or missing',          reason:  "The date is not shown or is greater than 30 days ago."},
      {id: 'invalid_location',  label: 'Location does not match receipt',  reason:  "The location does not match the receipt."},
      {id: 'unable_to_read',    label: 'Low-quality image',                reason:  "The image is too blurry (unable to read)."},
    ]
  end

  def reward_points
    amount.floor.to_i
  end

  def location
    redemption.location rescue nil
  end

end