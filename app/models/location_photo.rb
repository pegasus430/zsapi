class LocationPhoto < ActiveRecord::Base
 	belongs_to :location

  has_attached_file :image,
                    styles: { full: '1080x1080', index: '300x300', thumb: '200x200#'},
                    default_url: 'img-placeholder.png'

  validates :image, attachment_presence: true

  validates_attachment_content_type :image,
                                    content_type: ["images/jpg", "image/jpeg", "image/gif", "image/png"]


  ## Below is for the API
  def attributes
    super.merge({image_url: image_url})
  end

  def image_url
    image.url
  end
  ##
end