class Business < ActiveRecord::Base
  enum status: [:unpublished, :published, :locked]

  belongs_to :user
  has_many :greetings
  has_many :locations
  has_many :receipts, through: :locations
  has_many :campaigns
  has_many :memberships
  has_many :customers, through: :memberships
  has_many :greetings

  accepts_nested_attributes_for :locations, allow_destroy: true

  validates_presence_of :name
  validates_length_of :twitter, within: 1..15, allow_nil: true
  validates_format_of :primary_color, :secondary_color, with: /\A#?(?:[A-F0-9]{3}){1,2}\z/i, on: [:update]

  has_attached_file :image, :styles => { :medium => "500x500" }
  # validates_attachment_presence :image, on: [:update]
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  # Remove hashtags from color RGB hex values
	before_save { |u| u.primary_color[0]   = ''  if u.primary_color    && u.primary_color[0]   == '#' }
	before_save { |u| u.secondary_color[0] = ''  if u.secondary_color  && u.secondary_color[0] == '#' }


  def in_trial?
    trial_ends_at >= Date.today rescue false # rescue when nil
  end

  def start_trial!(end_date)
    if trial_ends_at.nil?
      self[:trial_ends_at] = end_date.to_date
      save
    end
  end
end
