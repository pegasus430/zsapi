class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :set_current_location

  def set_current_location
  	if params[:location_id]
  		@current_location = Location.find(params[:location_id])
  	end
  end
end
