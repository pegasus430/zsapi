class Api::V1::RedemptionsController < Api::V1::BaseController


	def index
		redemptions = current_customer.redemptions

		collection(redemptions,
			include: {
				campaign: { only: [:title] },
				location: { only: [:title] }
			},
			only: [
				:campaign_id,
				:location_id
			]
		)
	end


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