class Admin::AdminController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :authenticate_admin!


  private
	  def layout_by_resource
	    if devise_controller? && action_name != "edit"
	      "bare_application"
	    else
	      "admin_application"
	    end
	  end
end