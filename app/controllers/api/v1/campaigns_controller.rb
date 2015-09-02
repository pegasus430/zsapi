class Api::V1::CampaignsController < Api::V1::BaseController
	resource_description do
	  short 'These are the coupons, rewards, and specials'
	  meta campaign: Campaign.column_names
	end

	#####
  api!
  desc "Retreive all campaigns related to a given location"
  error code: 404, desc: "Location not found"
  param :id, :number, desc: "ID of Location", required: true
  example <<-EOS
  {
    "count" => 1,
    "response" => Array [
      Hash {
        "id" => ,
        "type_of" => ,#coupon, reward, special
        "title" => ,
        "discount_amount" => ,
        "discount_type" => ,#percent, amount
        "share_reward" => ,
        "image_file_name" => ,
        "schedule" => Hash { Schedule Object },
        "start_at" => ,#datetime
        "end_at" => ,#datetime
        "created_at" => ,#datetime
        "status" => ,#inactive, active, featured
        "pos" => ,#the UPC for generating barcodes
        "description" => #
      },
      # ...
    ]
  }
  EOS
	def index
		location = Location.find(params[:id])
		unless location.nil?
			campaigns = location.campaigns#.valid_for(Date.today)
			
			collection campaigns, include: :schedule, only: exposed_campaign
		else
			error! :not_found
		end
	end


	#####
	api!
	desc "Retreive a specific campaign"
	error code: 404, desc: "Campaign not found"
	param :id, :number, desc: "ID of Campaign", required: true
	response_params = Campaign.column_names.join ', '
	example <<-EOS
	{
	  "response" => Hash {
      "id" => ,
      "type_of" => ,#coupon, reward, special
      "title" => ,
      "discount_amount" => ,
      "discount_type" => ,#percent, amount
      "share_reward" => ,
      "image_file_name" => ,
      "schedule" => Hash { Schedule Object },
      "start_at" => ,#datetime
      "end_at" => ,#datetime
      "created_at" => ,#datetime
      "status" => ,#inactive, active, featured
      "pos" => ,#the UPC for generating barcodes
      "description" => #
    }
	}
	EOS
	def show
		campaign = Campaign.find(params[:id])
		unless campaign.nil?
			expose campaign, only: exposed_campaign
		else
			error! :not_found
		end
	end


	private

		def exposed_campaign
			[
				:id,
				:type_of,
				:title,
				:discount_amount,
				:discount_type,
				:share_reward,
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