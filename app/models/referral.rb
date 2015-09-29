class Referral < ActiveRecord::Base
	enum status: [:unused, :used]
	
  belongs_to :referrer, class_name: "Customer"
  belongs_to :campaign
  belongs_to :share_link
end
