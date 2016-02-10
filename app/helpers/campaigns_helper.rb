module CampaignsHelper

	def type_of_circle(type_of)
		raw "<span class='circle #{type_of}'>#{type_of[0].upcase}</span>"
	end

end
