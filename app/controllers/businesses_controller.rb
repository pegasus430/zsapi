class BusinessesController < ApplicationController
  http_basic_authenticate_with name: APP_CONFIG['lock_business_username'], password: APP_CONFIG['lock_business_password'], only: :lock
  skip_before_action :authenticate_user!, only: [:lock]
  skip_before_action :check_business_status, only: [:lock]
  skip_before_action :set_current_location, only: [:lock]

  before_action :set_business, only: [:show, :edit, :update]

  def lock
    business = Business.find(params[:id])
    business.locked!
    render html: "OK"
  end

  # GET /businesses/new
  def new
    if !current_user.business.nil?
      redirect_to root_url, alert: "You have already created your business."
    end

    @business = Business.new
    @business.locations.build
  end

  # GET /businesses/1/edit
  def edit
  end

  # POST /businesses
  # POST /businesses.json
  def create
    @business = Business.new(business_params)

    respond_to do |format|
      if @business.save
        format.html { redirect_to new_location_path, notice: 'Business was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end

  # PATCH/PUT /businesses/1
  # PATCH/PUT /businesses/1.json
  def update
    # The user is publishing the business
    if params[:publish]
      publish_errors = []
      %w(location campaign greeting).each do |child|
        publish_errors.push "Your business must have at least 1 #{child}" unless @business.send("#{child}s").exists?
      end

      if publish_errors.empty?
        @business.status = 'published'
        notice = 'Your store has been saved and published! Your location(s) are now visible in the Zippy Spot app.'
      else
        notice = "You're not quite ready to publish your store yet. Your locations, campaigns, and greetings must first be setup."
      end
    end


    respond_to do |format|
      @business.image = convert_data_uri_to_upload(params[:image_datafile]) unless params[:image_datafile].blank?

      if @business.update(business_params)

        if params[:facebook_page]
          current_user.set_facebook_page(params[:facebook_page])
        end

        if params[:publish]
          message = params[:shareText]
          current_user.tweet(message) if params[:share_to]["twitter"]
          current_user.post_to_facebook_page(message) if params[:share_to]["facebook"]
        end


        format.html { redirect_to edit_business_path, notice: notice || 'Business was successfully updated.' }
      else
        format.html { render :edit }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_business
      @business = current_user.business
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def business_params
      params.require(:business).permit(:name, :logo_filename, :primary_color, :secondary_color, :website, :facebook, :yelp_url, :twitter,
        :locations_attributes => [:address, :address2, :city, :state, :zipcode]
      )
    end
end
