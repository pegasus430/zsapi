module Locationable
	extend ActiveSupport::Concern
	
  def assigned_to_location?
    locations.exists?
  end

	def locations_string
	  if locations.size > 0
	    locations.order('title ASC').map(&:title).join(', ')
	  else
	    "None"
	  end
	end

end