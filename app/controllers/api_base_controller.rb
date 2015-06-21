class ApiBaseController < RocketPants::Base
	before_action :authenticate_social

	private
	
		def authenticate_social
			# authenticate_or_request_with_http_token do |token, options|
			#   @current_customer = Customer.where(social_token: token).first
			# end

			@current_customer = Customer.where('social_token IS NOT NULL').first

			error! :unauthenticated unless @current_customer
		end
end