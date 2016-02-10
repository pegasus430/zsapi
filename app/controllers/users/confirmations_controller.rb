class Users::ConfirmationsController < Devise::ConfirmationsController

  private

  	def after_confirmation_path_for(resource_name, resource)
  		flash[:success] = "Your account has been confirmed!"
    	root_path
  	end

end