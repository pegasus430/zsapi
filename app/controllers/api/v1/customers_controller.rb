class Api::V1::CustomersController < Api::V1::BaseController
	skip_before_action :require_customer!
	before_action :require_customer!, except: [:sign_in]


	# Signs the customer in by updating the social_token
	# and social_type
	def sign_in
		customer = Customer.find_by_email(params[:customer][:email])

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

		# This calls the 'profile' action in this controller
		# Returns the customer data
		show
	end


	# Signs the customer out by removing the social elements
	def sign_out
		current_customer.social_token = nil
		current_customer.social_type  = nil
		current_customer.save
	end


	# Updates the notification_token for the current customer
	def notification_token
		current_customer.notification_token = params[:notification_token]
		current_customer.save
	end

	# Returns the current_customer in JSON
  def show
		expose current_customer, only: [:first_name, :last_name, :email, :social_id, :social_type, :social_friends, :notification_token]
 	end


 	private
 		def customer_params
 			params[:customer][:social_friends] ||= []
 			params.require(:customer).permit(:email, :social_token, :social_type, :social_id, :first_name, :last_name, social_friends: []).merge(status: 'active')
 		end

end