class ApiBaseController < RocketPants::Base
	before_action :authenticate_tokens
	before_action :require_api_key!
	before_action :require_customer!

	def api_key_valid
		@api_key_valid === true
	end

	def current_customer
		@current_customer || nil
	end


	def require_api_key!
		error! :unauthenticated unless api_key_valid
	end

	def require_customer!
		error! :unauthenticated if current_customer.nil?
	end


	def authenticate_tokens
	  customer = authenticate_with_http_token do |token, options|
	  	# The token is the API secret key
	  	if Devise.secure_compare(Rails.configuration.x.api_secret_key, token)
	  		@api_key_valid = true

	  		# Check for social token
	  		if options[:social_token] && options[:id]
		    	customer = Customer.find_by_id( options[:id] )
		
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