class Api::V1::CustomersController < Api::BaseController

	# POST :email, :token, social_id
	def sign_in
		# Find user by email and social ID. Maybe token?
	end

	# POST :token, :customer_id
	def log_out
		# Return bool
	end

  def show
  	
 	end

end