class Business < ActiveRecord::Base
  belongs_to :user
  has_many :locations
  has_many :wallets
  has_many :customers, through: :wallets

  accepts_nested_attributes_for :locations, allow_destroy: true

  validates_presence_of :name
  validates_length_of :twitter, within: 1..15, allow_nil: true
  validates_format_of :primary_color, :secondary_color, with: /\A#?(?:[A-F0-9]{3}){1,2}\z/i, on: [:update]

  # Remove hashtags from color RGB hex values
	before_save { |u| u.primary_color[0]   = ''  if u.primary_color    && u.primary_color[0]   == '#' }
	before_save { |u| u.secondary_color[0] = ''  if u.secondary_color  && u.secondary_color[0] == '#' }
end
