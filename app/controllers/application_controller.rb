class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :check_business_status
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



  ## CROPBOX ##
  # Split up a data uri
  def split_base64(uri_str)
    if uri_str.match(%r{^data:(.*?);(.*?),(.*)$})
      uri = Hash.new
      uri[:type] = $1 # "image/gif"
      uri[:encoder] = $2 # "base64"
      uri[:data] = $3 # data string
      uri[:extension] = $1.split('/')[1] # "gif"
      return uri
    else
      return nil
    end
  end
   
  # Convert data uri to uploaded file. Expects object hash, eg: params[:post]
  def convert_data_uri_to_upload(data_uri)
    if !data_uri.blank?
      image_data = split_base64(data_uri)
      image_data_string = image_data[:data]
      image_data_binary = Base64.decode64(image_data_string)
   
      temp_img_file = Tempfile.new("data_uri-upload")
      temp_img_file.binmode
      temp_img_file << image_data_binary
      temp_img_file.rewind
   
      img_params = {:filename => "data-uri-img.#{image_data[:extension]}", :type => image_data[:type], :tempfile => temp_img_file}
      uploaded_file = ActionDispatch::Http::UploadedFile.new(img_params)
   
      return uploaded_file
    end
   
    return nil
  end



  private

    def check_business_status
      begin
        if current_user.business.locked?
          redirect_to locked_business_url
        end
      rescue
        false
      end
    end

    def layout_by_resource
      if devise_controller? && action_name != "edit"
        "bare_application"
      else
        "application"
      end
    end
end
