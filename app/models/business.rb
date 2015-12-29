class Business < ActiveRecord::Base
  enum status: [:unpublished, :published, :locked]

  belongs_to :user
  has_many :locations
  has_many :redemptions, through: :locations
  has_many :receipts, through: :redemptions
  has_many :campaigns
  has_many :memberships
  has_many :customers, through: :memberships
  has_many :greetings

  accepts_nested_attributes_for :locations, allow_destroy: true

  validates :name, presence: true
  validates_length_of :twitter, within: 1..15, allow_blank: true
  validates_format_of :primary_color, :secondary_color, with: /\A#?([A-F0-9]{3}){1,2}\z/i, on: [:update]

  has_attached_file :image,
                    styles: { index: '300x300#', medium: '500x500#' },
                    default_url: 'img-placeholder.png'
  # validates_attachment_presence :image, on: [:update]
  validates_attachment_content_type :image,
                                    content_type: ["images/jpg", "image/jpeg", "image/gif", "image/png"]

  # Remove hashtags from color RGB hex values
	before_save { |u| u.primary_color[0]   = ''  if u.primary_color    && u.primary_color[0]   == '#' }
	before_save { |u| u.secondary_color[0] = ''  if u.secondary_color  && u.secondary_color[0] == '#' }


  def in_trial?
    trial_ends_at >= Date.today rescue false # rescue when nil
  end

  def start_trial!(end_date)
    unless end_date.nil?
      if trial_ends_at.nil?
        self[:trial_ends_at] = Time.at(end_date).to_date
        save
      end
    end
  end

  def trial_days_remaining 
    if in_trial?
      (trial_ends_at - Date.today).to_i
    else
      0
    end
  end

  ## Below is for the API
  def attributes
    super.merge({image_url: image_url})
  end

  def image_url
    image.url
  end
  ##
  
end
