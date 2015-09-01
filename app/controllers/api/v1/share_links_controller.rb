class Api::V1::ShareLinksController < Api::V1::BaseController


	# Returns the campaign via the share link (code) provided
	def show
		share_link = ShareLink.find_by_code(params[:id])
		if share_link.nil?
			error! :not_found
		else
			Referral.find_or_create_by(referrer: share_link.customer, campaign: share_link.campaign, share_link: share_link)
			expose share_link.campaign
		end
	end


	def create
		share_link = ShareLink.find_or_create_by(valid_params)

		if share_link.valid?
			expose({
				url: share_link.url
			})
		else
			error! :invalid_resource, share_link.errors
		end
	end


 	private
 		def valid_params
      params.require(:share_link).permit(:campaign_id).merge(customer_id: current_customer.id)
 		end

 		
end