class Api::V1::BaseController < RocketPants::Base
	# Add APIPIE support
	extend Apipie::DSL::Controller
	resource_description do
		api_version "1.0"
		formats ['json']
	  # param 'Authentication: token', String, 				desc: "HEADER param: The Secret API Key", required: true
	  # param 'Authentication: id', :number, 					desc: "HEADER param: The ID of the customer in the session.", required: true
	  # param 'Authentication: social_token', String, desc: "HEADER param: The social_token of the customer in the session.", required: true
	  error code: 401, desc: "Unauthorized - Returned when authentication can't be achieved via login or missing/expired api token"
	end

	before_action :authenticate_tokens 	# Get the customer from the API headers
	before_action :require_api_key! 		# Ensure we have the correct API key
	before_action :require_customer! 		# Ensure we have a customer loaded (if required)

	version 1

	def api_key_valid?
		@api_key_valid === true
	end

	def current_customer
		@current_customer || nil
	end

	def require_api_key!
		error! :unauthenticated unless api_key_valid?
	end

	def require_customer!
		error! :unauthenticated if current_customer.nil?
	end

	def authenticate_tokens
	  customer = authenticate_with_http_token do |token, options|
	  	# The token is the API secret key
	  	if Devise.secure_compare(ENV['API_SECRET_KEY'], token)
	  		@api_key_valid = true

	  		# Check for social token
	  		if options[:social_token] && options[:id]
		    	customer = Customer.find_by_id(options[:id])
		
					# Compare the customer's social token with what was provided
			    if customer && Devise.secure_compare(customer.social_token, options[:social_token])
		      	customer
		    	else
			      nil
		    	end
		    else
		    	nil
		    end
		  else
		  	@api_key_valid = false
		  	nil
		  end
	  end
	  @current_customer = customer
	end

end