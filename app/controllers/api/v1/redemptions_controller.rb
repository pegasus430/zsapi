class Api::V1::RedemptionsController < Api::V1::BaseController

	resource_description do
	  short 'Redemptions are what the customer created upon every redeemed campaign.'
	  meta :redemption => Redemption.column_names
	end

	#####
	api!
	desc "List the current user's redemptions"
	example <<-EOS
	{
	  "count" => 1,
	  response => Array[
	    Hash {
        "id" => ,
        "campaign" => Hash { Campaign Object }
        "location" => Hash { Location Object }
	    }
	  ]
	}
	EOS
	def index
		redemptions = current_customer.redemptions

		collection(redemptions,
			include: [
				:campaign,
				:location
			],
			only: [
				:campaign_id,
				:location_id
			]
		)
	end


	#####
	api!
	desc "Creates a redemption"
	error code: 422, desc: "Invalid redemption parameters. Redemption did not save"
	param :redemption, Hash, required: true do
		param :campaign_id, :number, desc: "The campaign ID", required: true
		param :location_id, :number, desc: "The location ID", required: true
	end
	example "200 OK"
	def create
		redemption = Redemption.new(valid_params)
		redemption.customer = current_customer

		unless redemption.save
			error! :invalid_resource, redemption.errors
		end
	end


 	private
 		def valid_params
      params.require(:redemption).permit(:location_id, :campaign_id)
 		end
 		
end