class Api::V1::ShareLinksController < Api::V1::BaseController
	resource_description do
	  short 'When a customer shares a campaign, a share link is created.'
	  meta :share_link => ShareLink.column_names
	end

	api!
	desc "Returns the campaign via the share link (code) provided"
	param :id, String, desc: "The share link's ID (code)", required: true
	example <<-EOS
	{
	  response => Hash {Campaign Data}
	}
	EOS
	def show
		share_link = ShareLink.find_by_code(params[:id])
		if share_link.nil?
			error! :not_found
		else
			Referral.find_or_create_by(customer_id: current_customer.id, referrer_id: share_link.customer.id, campaign: share_link.campaign, share_link: share_link)
			expose share_link.campaign, only: [
				:id,
				:type_of,
				:title,
				:discount_amount,
				:discount_type,
				:referral_reward,
				:referrer_reward,
				:image_file_name,
				:featured,
				:schedule,
				:start_at,
				:end_at,
				:created_at,
				:status,
				:pos,
				:description
			]
		end
	end


	#####
	api!
	desc "Create a new share link for a campaign and return the URL"
	param :share_link, Hash, required: true do
		param :campaign_id, :number, desc: "The ID of the campaign being shared", required: true
	end
	error code: 422, desc: "Invalid parameters. Link was not created"
	example <<-EOS
	{
	  "response" => Hash{
	    "url" => #the complete URL of the share link
	  }
	}
	EOS
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