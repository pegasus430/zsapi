class Api::V1::CustomersController < ApiBaseController
	skip_before_action :authenticate_social
	before_action :authenticate_social, except: [:sign_in]


	# POST :first_name, :last_name, :email, :social_id, :social_type, :social_token
	def sign_in
		customer = Customer.find_by_email(params[:customer][:email])

		if customer
			customer.active = true
			customer.update(customer_params)
		else
			customer = Customer.new(customer_params)
			customer.save
		end

		expose customer, only: [:first_name, :last_name, :email, :social_id, :social_type, :social_token]
	end


	# POST
	def sign_out
		# byebug
		@current_customer.social_token = nil
		@current_customer.save
	end


	# POST :notification_token
	def notification_token
		@current_customer.notification_token = params[:notification_token]
		@current_customer.save
	end


  def fetch
		expose @current_customer, only: [:first_name, :last_name, :email, :social_id, :social_type, :social_token]
 	end


 	private
 		def customer_params
 			params.require(:customer).permit(:email, :social_token, :social_type, :social_id, :first_name, :last_name)
 		end

end