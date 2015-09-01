class Api::V1::ReceiptsController < Api::V1::BaseController

	# Create a new receipt with the given params
	def create
		receipt = Receipt.new(valid_params)
		unless receipt.save
			error! :invalid_resource, receipt.errors
		end
	end

	# Shows the receipts and status
	def index
		receipts = current_customer.receipts.where(status: params[:status]).all
		collection receipts
	end


 	private
 		def valid_params
      params.require(:receipt).permit(:redemption_id, :location_id, :image)
 		end
end