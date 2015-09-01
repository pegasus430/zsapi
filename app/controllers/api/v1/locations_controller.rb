class Api::V1::LocationsController < Api::V1::BaseController

	# GET :id
	def show
		loc = Location.find(params[:id])
		
		if loc
			expose({
				business:   loc.business,
				title: 			loc.title,
				address: 		loc.address,
				address2: 	loc.address2,
				city: 			loc.city,
				state: 			loc.state,
				zipcode: 		loc.zipcode,
				latitude: 	loc.latitude,
				longitude: 	loc.longitude,
				status: 		loc.status,
				points: 		current_customer.membership_for(loc.business_id).points,
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
			collection loc, include: :business, only: [
				:title,
				:address,
				:address2,
				:city,
				:state,
				:zipcode,
				:latitude,
				:longitude,
				:status,
				:distance
			]
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
			collection loc, include: :business, only: [
				:title,
				:address,
				:address2,
				:city,
				:state,
				:zipcode,
				:latitude,
				:longitude,
				:status,
				:distance
			]
		else
			error! :invalid_resource, loc.errors
		end
	end


 	private
 		def valid_params
      params.require(:location).permit(:location_id, :image)
 		end
end