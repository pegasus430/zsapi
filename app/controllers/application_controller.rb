class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :set_current_location
  layout :layout_by_resource #< allows us to easily set different layouts for devise

  def set_current_location
  	if params[:location_id]
  		@current_location = current_user.business.locations.find(params[:location_id])
  	end
  end


  ## DEVISE ##
  # Overwriting the sign_out redirect path method
  def after_sign_out_path_for(resource_or_scope)
    flash[:success] = "You have been logged out successfully!"
    new_user_session_url
  end



  private

    def layout_by_resource
      if devise_controller? && action_name != "edit"
        "bare_application"
      else
        "application"
      end
    end
end
