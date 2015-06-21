class Api::V1::ReceiptsController < ApiBaseController

	# POST receipt: {:location_id, :image}
	def create
		receipt = Receipt.new(valid_params)
		unless receipt.save
			error! :invalid_resource, receipt.errors
		end
	end


 	private
 		def valid_params
      params.require(:receipt).permit(:location_id, :image)
 		end
end