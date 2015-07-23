class Redemption < ActiveRecord::Base
	enum status: [:pending, :complete]
	
  belongs_to :campaign
  belongs_to :customer
  belongs_to :location
  has_one :receipt

  validates_presence_of :campaign, :customer, :location

  def award_points_to_customer!
  	customer.membership_for(location.business).increment!(:points, receipt.reward_points)
  end
end
