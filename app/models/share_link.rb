class ShareLink < ActiveRecord::Base
  belongs_to :campaign
  belongs_to :referrer, class: Customer
  belongs_to :customer

  validates :code, presence: true

  before_validation :set_unique_code

  # Display the URL
  def url
  	"http://www.zippyspot.com/share/#{code}"
  end

	# The characters to be used in a share code
	def self.generate_unique_code
		length 	= 10
		charset = ('a'..'z').to_a + (0..9).to_a

		(0...length).map{ charset[rand(charset.size)] }.join
	end

  private
  	def set_unique_code
  		self[:code] = ShareLink::generate_unique_code
  	end
end
