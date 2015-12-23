class Api::V1::LocationsController < Api::V1::BaseController
	resource_description do
	  short 'The individual locations of a business'
	  meta :campaign => Location.column_names
	end

	#####
	api!
	desc <<-EOS
	Returns a location object and includes information relevant to the current customer.

	There are two ways to retreive data for a single location, by inputting the beacon's UUID, or by inputting the location's ID. Use the proper route depending on what you're trying to do.
	EOS
	param :id, :number, desc: "The location ID. *Required* *if:* Using the ID route"
	param :uuid, String, desc: "The beacon's UUID. *Required* *if:* Using the UUID route"
	example <<-EOS
		{
		  "count" => 0,
		  "response" => Array[
		    Hash {
		      "id" => ,
		      "business" => Hash { Business Object },
		      "beacon" => Hash { Beacon Object },
		      "title" => ,
		      "address" => ,
		      "address2" => ,
		      "city" => ,
		      "state" => ,
		      "zipcode" => ,
		      "latitude" => ,
		      "longitude" => ,
		      "status" => ,
		      "points" => , 	# The current customer's points for this location
		      "visits" =>   	# The number of checkins for the current customer at this location
		    },
		    # ...
		  ]
		}
	EOS
	def show
		if params[:id]
			loc = Location.find(params[:id])
		elsif params[:uuid]
			loc = Beacon.find_by_uuid(params[:uuid]).location
		end

		if loc
			beacon = loc.beacon unless loc.beacon.blank?

			expose({
				id: 				 loc.id,
				business:    loc.business,
				title: 			 loc.title,
				address: 		 loc.address,
				address2: 	 loc.address2,
				city: 			 loc.city,
				state: 			 loc.state,
				zipcode: 		 loc.zipcode,
				latitude: 	 loc.latitude,
				longitude: 	 loc.longitude,
				status: 		 loc.status,
				points: 		 current_customer.membership_for(loc.business).points,
				visits: 		 current_customer.total_visits_for(loc),
				beacon:      beacon
			})
		else
			error! :not_found
		end
	end


	#####
	api!
	desc "Returns nearby locations according to the given coordinates"
	param :lat, String, desc: "Latitude of start", required: true
	param :lon, String, desc: "longitude of start", required: true
	example <<-EOS
		{
		  "count" => 0,
		  "response" => Array[
		    Hash {
		      "id" => ,
		      "beacon" => Hash { Beacon Object },
		      "business" => Hash { Business Object },
		      "title" => ,
		      "address" => ,
		      "address2" => ,
		      "city" => ,
		      "state" => ,
		      "zipcode" => ,
		      "latitude" => ,
		      "longitude" => ,
		      "status" => ,
		      "distance" => 
		    },
		    # ...
		  ]
		}
	EOS
	meta limit: 20
	def fetch_nearby
		loc = Location.near([params[:lat], params[:lon]], 10).limit(20)

		if loc
			collection loc,
				include: [
					:business, 
					# greeting: {include: [:campaign]},
					beacon: {only: [:uuid, :status]},
				],
				methods: [:exit_campaign],
				only: [
					:id,
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
			error! :not_found
		end
	end


	#####
	api!
	desc "Returns locations in a given map square (according to distance limit)"
	param :lat, String, desc: "Latitude of center of map", required: true
	param :lon, String, desc: "Longitude of center of map", required: true
	param :distance, :number, desc: "Distance from center of map (in miles)", required: true
	example <<-EOS
		{
		  "count" => 0,
		  "response" => Array[
		    Hash {
		      "id" => ,
		      "beacon" => Hash { Beacon Object },
		      "business" => Hash { Business Object },
		      "title" => ,
		      "address" => ,
		      "address2" => ,
		      "city" => ,
		      "state" => ,
		      "zipcode" => ,
		      "latitude" => ,
		      "longitude" => ,
		      "status" => ,
		      "distance" => 
		    },
		    # ...
		  ]
		}
	EOS
	def fetch_map
		center_point = [params[:lat], params[:lon]]
		distance = [params[:distance].to_i, 20].min
		box = Geocoder::Calculations.bounding_box(center_point, distance)
		loc = Location.within_bounding_box(box)

		if loc
			collection loc, include: [:business, beacon: {only: [:uuid, :status]}], only: [
				:id,
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