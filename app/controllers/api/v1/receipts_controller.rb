class Api::V1::ReceiptsController < Api::V1::BaseController
	resource_description do
	  short 'Receipts are associated with redemptions and are uploaded by the customer for approval'
	  meta :receipt => Receipt.column_names
	end

	api!
	desc "Create a new receipt with the given params."
	error code: 422, desc: "Invalid receipt params were given (or invalid image)."
	param :receipt, Hash, required: true do
		param :redemption_id, :number, desc: "The associated redemption_id (Required IF related to a campaign)"
		param :location_id, :number, desc: "The associated location_id (Required IF this is a receipt that is not associated with a campaign redemption)"
		param :image, File, desc: "The receipt image", required: true
	end
	example "If a receipt is associated with a prior redemption, you MUST include the redemption ID. Otherwise, if this receipt is being uploaded by itself and is not related to a campaign's redemption, you MUST pass the location_id that the receipt is associated with. Returns 200 OK"
	def create
		# If the redemption ID is nil, we create the redemption so we can
		# assign it to the receipt
		if params[:receipt][:location_id]
			redemption_id = Redemption.create(customer: current_customer, location_id: params[:receipt][:location_id]).id
		else
			redemption_id = params[:receipt][:redemption_id]
		end

		receipt = Receipt.new(image: params[:receipt][:image], redemption_id: redemption_id)
		
		unless receipt.save
			error! :invalid_resource, receipt.errors
		end
	end

	api!
	desc "Shows the receipts and status"
	param :status, ["untouched", "approved", "rejected", "all"], desc: "The status of the receipts shown", default: "untouched"
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
		params[:status] ||= 'untouched'
		receipts = current_customer.receipts
		receipts = receipts.where(status: params[:status]).all unless params[:status] == 'all'

		collection receipts, include: [:location, :business], only: [
			:id,
			:purchased_on,
			:amount,
			:reject_reason,
			:created_at,
			:status,
			:actioned_on,
			:image_file_name
		]
	end


 	private
 		def valid_params
      params.require(:receipt).permit(:redemption_id, :image).merge!(customer_id: current_customer.id)
 		end
end