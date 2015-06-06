class Receipt < ActiveRecord::Base
	UNTOUCHED = 0
	APPROVED  = 1
	REJECTED  = 2

  belongs_to :location

  validates_presence_of :location_id, :amount, :purchased_on
  validates_presence_of :reject_reason, unless: "rejected_on.nil?"
  validate :consistent_approve_reject


  def self.untouched
  	Receipt.where('approved_on IS NULL AND rejected_on IS NULL')
  end

  def self.approved
  	Receipt.where('approved_on IS NOT NULL AND rejected_on IS NULL')
  end

  def self.rejected
  	Receipt.where('approved_on IS NULL AND rejected_on IS NOT NULL')
  end
  

  def status
  	if approved_on.blank? && rejected_on.blank?
  		Receipt::UNTOUCHED
  	elsif !approved_on.blank? && rejected_on.blank?
  		Receipt::APPROVED
  	elsif approved_on.blank? && !rejected_on.blank?
  		Receipt::REJECTED
  	end
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


  private

  	def consistent_approve_reject
  		if !approved_on.blank? && !rejected_on.blank?
  			return false
  		else
  			return true
  		end
  	end
end
