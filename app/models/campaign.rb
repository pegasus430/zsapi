class Campaign < ActiveRecord::Base
	CT_COUPON = 0
	CT_REWARD = 1
	CT_SPECIAL = 2
	DT_AMOUNT = 0
	DT_PERCENT = 1

  belongs_to :schedule
  has_and_belongs_to_many :locations

  validates_presence_of :type_of, :title, :discount_amount, :discount_type, :featured, :active, :start_at

  has_attached_file :image, :styles => { :medium => "500x500" }
  validates_attachment_presence :image
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  def active
  	where(active: true)
  end

  def inactive
  	where(active: false)
  end

  def featured
  	# where(featured: true)
  end

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
