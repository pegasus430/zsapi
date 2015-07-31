module CampaignsHelper

	def type_of_circle(type_of)
		color = case type_of
		when 'coupon' 	then 'green'
		when 'reward' 	then 'blue'
		when 'special' 	then 'red'
		end

		raw "<span class='circle #{color}'>#{type_of[0].upcase}</span>"
	end

end
