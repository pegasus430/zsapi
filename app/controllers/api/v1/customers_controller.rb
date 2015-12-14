class Api::V1::CustomersController < Api::V1::BaseController
	skip_before_action :require_customer!
	before_action :require_customer!, except: [:sign_in]


	resource_description do
	  short 'The people who use the mobile app'
	  meta :customer => Customer.column_names
	end


	#####
	api!
	desc "Signs the customer in by updating the social_token and social_type"
	example "A successful sign in will return the customer object. See the /profile page for details on the hash that is returned."
	param :customer, Hash, required: true do
		param :email, 					String, desc: "Email address of customer", required: true
		param :social_token,	 	String, desc: "The social token returns by Facebook/Google+", required: true
		param :social_type, 		["facebook", "google+"], desc: "The type of social account connected", required: true
		param :social_id, 			String, desc: "The social ID", required: true
		param :avatar_url, 			String, desc: "An URL to use as the customer's avatar (can be blank).", required: false
		param :first_name, 			String, desc: "Customer's first name", required: true
		param :last_name, 			String, desc: "Customer's last name", required: true
		param :social_friends, 	Array,	desc: "An array of the customer's social friends. Example: social_friends[]=1&social_friends[]=2. Leave BLANK if empty."
	end
	def sign_in
		customer = Customer.find_by_email(params[:customer][:email])

		if customer_params[:social_friends].empty?
			customer_params.delete(:social_friends)
		end

		if customer
			customer.update(customer_params)
		else
			customer = Customer.new(customer_params)

			if customer.valid?
				customer.save
			else
				error! :bad_request
			end
		end

		# Save the current customer
		@current_customer = customer

		expose @current_customer, only: customer_expose_fields
	end


	#####
	api!
	desc "Signs the customer out by removing the social elements"
	example "200 OK"
	def sign_out
		current_customer.social_token = nil
		current_customer.social_type  = nil
		current_customer.save
	end


	#####
	api!
	desc "Checks in the customer to a location"
	param :location_id, :number, desc: "The ID of the location", required: true
	example <<-EOS
	{
	  "response" => {
	    "welcome_message", 		# The welcome greeting
	    "points_earned", 		# The amount of points earned for checking in
	    "special_campaign" => { 	# The exit campaign from their prior checkout (if available)
	      #Campaign Meta
	    }
	  }
	}
	EOS
	def check_in
		location = Location.find(params[:location_id])
		unless location.nil?
			visit_details = current_customer.check_in_to!(location)
			
			expose({
				welcome_message: 	visit_details[:welcome_message],
				points_earned: 		visit_details[:points_earned],
				special_campaign: visit_details[:campaign]
			})
		else
			error! :not_found
		end
	end


	#####
	api!
	desc "Checks OUT the customer FROM a location and returns the exit message"
	param :location_id, :number, desc: "The ID of the location", required: true
	example <<-EOS
	{
	  "response" => {
	    "exit_message", 		# The exit greeting
	    "wait_time", 		# The amount time until the special campaign expires
	    "special_campaign" => { 	# The exit campaign that can be redeemed on their next check in
	      #Campaign Meta
	    }
	  }
	}
	EOS
	def check_out
		location = Location.find(params[:location_id])
		unless location.nil?
			visit_details = current_customer.check_out_from!(location)
			
			expose({
				exit_message: 		visit_details[:exit_message],
				wait_time: 				visit_details[:wait_time],
				special_campaign: visit_details[:campaign]
			})
		else
			error! :not_found
		end
	end


	api!
	desc "Updates the notification_token for the current customer"
	param :notification_token, String, desc: "The notification token to be stored", required: true
	example "200 OK"
	def notification_token
		if params[:notification_token]
			current_customer.notification_token = params[:notification_token]
			current_customer.save
		else
			error! :bad_request
		end
	end

	api!
	desc "Returns the current_customer in JSON"
	example <<-EOS
	{
	  "response" => Hash {
	  	id,
	    first_name,
	    last_name,
	    email,
	    social_id,
	    social_type,
	    social_friends,
	    notification_token
    }
	}
	EOS
  def show
		expose current_customer, only: customer_expose_fields
 	end


 	api!
	desc "Returns a list of the customer's friends' redemption feed"
	example <<-EOS
	{
	  "response" => [
	  	Hash {
		  	campaign: Hash {
		  		id,
		  		title
		  	},
		    location: Hash {
		    	id,
		    	title
		    },
		    customer: Hash {  # < The friend
		    	id,
		    	first_name,
		    	last_name,
		    	avatar_url
		    }
		  }
    }
	}
	EOS
  def feed
		collection(current_customer.friend_feed,
			include: {
				campaign: { only: [:id, :title] },
				location: { only: [:id, :title] },
				customer: { only: [:id, :first_name, :last_name, :avatar_url, :social_id, :social_type] }
			}
		)
 	end


 	api!
	desc "Returns a list of the locations a customer has visited"
	example <<-EOS
	{
	  "response" => [
	  	Hash {
		  	location_id,
		  	last_visit_at,
		  	last_exit_at,
		  	total,
		  	membership_points,
				location: Hash {
					id,
					title,
					business: Hash {
						id,
						name,
						image_url
					}
				}
		  }
    }
	}
	EOS
  def visits
		collection(current_customer.visits,
			include: [
				{
					location: {
						only: [:id, :title],
						include: {
							business: {
								only: [:id, :name, :primary_color, :secondary_color],
								methods: [:image_url]
							}
						}
					}
				}
			],
			methods: [:membership_points],
			only: [
				:location_id,
				:last_visit_at,
				:last_exit_at,
				:total
			]
		)
 	end


 	private
 		def customer_params
 			params[:customer][:social_friends] ||= []
 			params.require(:customer).permit(:email, :social_token, :social_type, :social_id, :avatar_url, :first_name, :last_name, social_friends: []).merge(status: 'active')
 		end

 		def customer_expose_fields
 			[:id, :first_name, :last_name, :email, :social_id, :social_type, :social_friends, :notification_token, :avatar_url]
 		end

end