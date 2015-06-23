class Api::V1::CampaignsController < ApiBaseController

	# GET :location_id
	def index
		loc = Campaign.near([params[:lat], params[:lon]], 1)

		if loc
			collection loc, only: [:title, :address, :address2, :city, :state, :zipcode, :latitude, :longitude, :active, :points, :visits]
		else
			error! :invalid_resource, loc.errors
		end
	end


 	private
 		def valid_params
      params.require(:campaign).permit(:campaign_id, :image)
 		end

 		def expose_campaign(loc)
 			if loc
 				expose({
 					title: 			loc.title,
 					address: 		loc.address,
 					address2: 	loc.address2,
 					city: 			loc.city,
 					state: 			loc.state,
 					zipcode: 		loc.zipcode,
 					latitude: 	loc.latitude,
 					longitude: 	loc.longitude,
 					active: 		loc.active?,
 					points: 		@current_customer.points(loc.business_id),
 					visits: 		@current_customer.visits_for(loc)
 				})
 			else
 				error! :invalid_resource, loc.errors
 			end
 		end
end