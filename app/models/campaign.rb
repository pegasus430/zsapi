class Campaign < ActiveRecord::Base
  include Locationable
  include DatePickable
  include TimeFilterable

  datepicker [:start_at, :end_at]

  enum type_of: [:coupon, :reward, :special]
  enum discount_type: [:amount, :percent]
  enum status: [:inactive, :active, :featured]

  belongs_to :schedule
  belongs_to :business
  has_and_belongs_to_many :locations
  has_many :redemptions, dependent: :restrict_with_error

  accepts_nested_attributes_for :schedule

  validates :type_of, :title, :discount_amount, :discount_type, :start_at, presence: true
  validates :reward_cost, numericality: { greater_than: 0 }, if: -> { type_of == 'reward' }

  has_attached_file :image, styles: { index: '210x170', :medium => "630x510" }, default_url: 'img-placeholder.png'
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  scope :valid_for, ->(date) {
  	# Add '99' (the last day criteria) to the query if 'date.day' is equal to the last day of the month
  	add_last_day = (date.day == date.end_of_month.day) ? Schedule::LAST_DAY : nil

		active.includes(:schedule).where("
			( start_at <= ? AND (end_at IS NULL OR end_at >= ? ) )
			AND schedules.days_of_week && '{0, ?}'::INT[]
			AND schedules.weeks_of_month && '{0, ?}'::INT[]
			AND schedules.day_numbers && ?::INT[]",
			date,
			date,
			date.wday + 1,
			date.week_of_month,
			'{' + [0, date.day, add_last_day].compact.join(',') + '}'
		).references(:schedule)
  }

  def end_at_selector
    if self[:end_at].blank?
      "never"
    else
      "specific"
    end
  end

  def end_at_selector=(value)
    self[:end_at] = nil if value == "never"
  end

  def most_popular_location
    locations.find( redemptions.group(:location_id).count.max_by{|k,v| v}.first ) rescue nil
  end

  def attributes
    super.merge({image_url: image_url})
  end

  def image_url
    image.url
  end

end