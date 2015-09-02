class Api::V1::ReceiptsController < Api::V1::BaseController
	resource_description do
	  short 'Receipts are associated with redemptions and are uploaded by the customer for approval'
	  meta :receipt => Receipt.column_names
	end

	api!
	desc "Create a new receipt with the given params"
	error code: 422, desc: "Invalid receipt params were given (or invalid image)."
	param :receipt, Hash, required: true do
		param :redemption_id, :number, desc: "The associated redemption_id", required: true
		param :location_id, :number, desc: "The location_id of where the redempetion was made (MAY REMOVE THIS)", required: true
		param :image, File, desc: "The receipt image", required: true
	end
	example "200 OK"
	def create
		receipt = Receipt.new(valid_params)
		unless receipt.save
			error! :invalid_resource, receipt.errors
		end
	end

	api!
	desc "Shows the receipts and status"
	param :status, ["untouched", "approved", "rejected"], desc: "The status of the receipts shown", default: "untouched"
	example <<-EOS
	{
	  "count" => 1,
	  response => Array[
	    Hash {
        "id" => ,
        "purchased_on" => ,#is updated by the admin
        "amount" => ,#is 0 until admin sets amount
        "reject_reason" => ,#is blank unless rejected
        "created_at" => ,#when the receipt was uploaded initially
        "status" => ,
        "actioned_on" => ,#when the receipt was approved/rejected
        "image_file_name" => ,
        "location" => Hash {Location Data}
	    }
	  ]
	}
	EOS
	def index
		receipts = current_customer.receipts.where(status: params[:status]).all
		collection receipts, include: :location, only: [
			:id,
			:purchased_on,
			:amount,
			:reject_reason,
			:created_at,
			:status,
			:actioned_on,
			:image_file_name,
			:location
		]
	end


 	private
 		def valid_params
      params.require(:receipt).permit(:redemption_id, :location_id, :image)
 		end
end