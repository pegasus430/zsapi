class Api::V1::LocationsController < ApiBaseController

	# GET :id
	def fetch
		loc = Location.find(params[:id])
		expose_location(loc)
	end

	# GET :lat, :long
	def fetch_nearby
		loc = Location.near(params[:lat], params[:long], 20)
		expose_location(loc)
	end


 	private
 		def valid_params
      params.require(:location).permit(:location_id, :image)
 		end

 		def expose_location(loc)
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