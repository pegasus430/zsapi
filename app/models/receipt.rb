class Receipt < ActiveRecord::Base
	UNTOUCHED = 0
	APPROVED  = 1
	REJECTED  = 2

  belongs_to :location

  validates_presence_of :location_id
  validates_presence_of :amount, :purchased_on, on: [:update]
  validates_presence_of :reject_reason, if: "status == #{Receipt::REJECTED}"

  has_attached_file :image, :styles => { :medium => "500x500>" }
  validates_attachment_presence :image
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/


  def self.untouched
    Receipt.where( status: Receipt::UNTOUCHED )
  end

  def self.approved
    Receipt.where( status: Receipt::APPROVED )
  end

  def self.rejected
  	Receipt.where( status: Receipt::REJECTED )
  end

  def self.from_today
    where( actioned_on: (Date.today)..(Date.today + 23.hours + 59.minutes + 59.seconds) )
  end

  def untouched?
  	( status == Receipt::UNTOUCHED )
  end

  def approved?
  	( status == Receipt::APPROVED )
  end

  def rejected?
  	( status == Receipt::REJECTED )
  end

end