class Campaign < ActiveRecord::Base
	CT_COUPON = 0
	CT_REWARD = 1
	CT_SPECIAL = 2
	DT_AMOUNT = 0
	DT_PERCENT = 1

  belongs_to :schedule
  has_and_belongs_to_many :locations

  validates_presence_of :type_of, :title, :discount_amount, :discount_type, :start_at

  has_attached_file :image, :styles => { :medium => "500x500" }
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  scope :active, 		-> { where(status: true) }
  scope :inactive, 	-> { where(status: false) }
  scope :featured, 	-> { where(featured: true) }


  def self.coupons
  	Campaign.where(type_of: Campaign::CT_COUPON)
  end

  def self.rewards
  	Campaign.where(type_of: Campaign::CT_REWARD)
  end

  def self.specials
  	Campaign.where(type_of: Campaign::CT_SPECIAL)
  end
end
