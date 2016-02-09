module Locationable
	extend ActiveSupport::Concern
	
  def assigned_to_location?
    locations.exists?
  end

	def locations_string
	  unless locations.blank?
	    locations.order('title ASC').map(&:title).join(', ')
	  else
	    "None"
	  end
	end

end