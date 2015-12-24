class LocationPicture < ActiveRecord::Base
  belongs_to :location

  has_attached_file :image,
                    styles: { full: '1080x1080', thumb: '300x300#'},
                    default_url: 'img-placeholder.png'

  validates :image, attachment_presence: true

  validates_attachment_content_type :image,
                                    content_type: ["images/jpg", "image/jpeg", "image/gif", "image/png"]
end
