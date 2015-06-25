class Api::V1::LocationsController < ApiBaseController

	# GET :id
	def fetch
		loc = Location.find(params[:id])
		
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
				points: 		current_customer.points(loc.business_id),
				visits: 		current_customer.visits_for(loc)
			})
		else
			error! :invalid_resource, loc.errors
		end
	end

	# GET :lat, :lon
	def fetch_nearby
		loc = Location.near([params[:lat], params[:lon]], 1).limit(20)

		if loc
			collection loc, only: [:title, :address, :address2, :city, :state, :zipcode, :latitude, :longitude, :active, :distance]
		else
			error! :invalid_resource, loc.errors
		end
	end


	# GET :lat, :lon, :distance
	def fetch_map
		center_point = [params[:lat], params[:lon]]
		distance = [params[:distance].to_i, 20].min
		box = Geocoder::Calculations.bounding_box(center_point, distance)
		loc = Location.within_bounding_box(box)

		if loc
			collection loc, only: [:title, :address, :address2, :city, :state, :zipcode, :latitude, :longitude, :active]
		else
			error! :invalid_resource, loc.errors
		end
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
 					points: 		current_customer.points(loc.business_id),
 					visits: 		current_customer.visits_for(loc)
 				})
 			else
 				error! :invalid_resource, loc.errors
 			end
 		end
end