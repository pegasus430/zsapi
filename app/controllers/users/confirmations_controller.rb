class Users::ConfirmationsController < Devise::ConfirmationsController

  private

  	def after_confirmation_path_for(resource_name, resource)
  		flash[:success] = "Your account has been confirmed! Continue by creating your business."
    	new_business_path
  	end

end