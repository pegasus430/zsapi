class LocationsController < ApplicationController
  before_action :set_location, only: [:show, :edit, :update, :destroy]
  before_action :set_campaigns_and_greetings, only: [:new, :create, :edit, :update]

  # GET /locations
  # GET /locations.json
  def index
    @active_locations  = current_user.business.locations.active
    @pending_locations = current_user.business.locations.pending
  end

  # GET /locations/1
  # GET /locations/1.json
  def show
    render :confirm if @location.pending?

    # Stats
    stat_query      = @location
    today_range     = Date.today.beginning_of_day..Date.today.end_of_day
    yesterday_range = Date.yesterday.beginning_of_day..Date.yesterday.end_of_day

    @stats = {
      today: {
        checkins:       Stat.total_checkins(query: stat_query, range: today_range),
        redemptions:    Stat.total_redemptions(query: stat_query, range: today_range),
        coupons:        Stat.total_redemptions(type: 'coupons', query: stat_query, range: today_range),
        rewards:        Stat.total_redemptions(type: 'rewards', query: stat_query, range: today_range),
        specials:       Stat.total_redemptions(type: 'specials', query: stat_query, range: today_range),
        # new_customers:  Stat.new_customers(query: stat_query, range: today_range)
      },
      yesterday: {
        checkins:     Stat.total_checkins(query: stat_query, range: yesterday_range),
        redemptions:  Stat.total_redemptions(query: stat_query, range: yesterday_range)
      }
    }
  end

  # GET /locations/new
  def new
    @location = current_user.business.locations.build
    Location::MAX_PHOTOS.times { @location.location_photos.build }
  end

  # GET /locations/1/edit
  def edit
    if @location.pending?
      render :confirm
    end
    
    (Location::MAX_PHOTOS - @location.location_photos.size).times { @location.location_photos.build }

    @new_greeting = Greeting.new
  end

  # POST /locations
  # POST /locations.json
  def create
    @location = current_user.business.locations.build(location_params.except(:greeting))

    # Create each image
    if params[:image_datafiles]
      params[:image_datafiles].each do |image|
        @location.location_photos.create(image: convert_data_uri_to_upload(image)) unless image.blank?
      end
    end

    if params[:new_greeting]
      @location.build_greeting(location_params[:greeting])
    end

    respond_to do |format|
      if @location.save
        format.html { redirect_to location_new_subscription_path(@location), notice: 'Location was successfully created. Create the subscription now' }      else
        format.html { render :new }
      end
    end
  end

  # PATCH/PUT /locations/1
  # PATCH/PUT /locations/1.json
  def update
    # Create each image
    if params[:image_datafiles]
      params[:image_datafiles].each_with_index do |image, index|
        if @location.location_photos[index].nil?
          @location.location_photos.create(image: convert_data_uri_to_upload(image)) unless image.blank?
        else
          @location.location_photos[index].update_attributes(image: convert_data_uri_to_upload(image))
        end
      end
    end

    respond_to do |format|
      if @location.update(location_params.except(:greeting))
        if params[:new_greeting]
          new_greeting = Greeting.create(location_params[:greeting].merge(business_id: @location.business_id))
          @location.update_attribute(:greeting_id, new_greeting.id)
        end
        format.html { redirect_to edit_location_path(@location), notice: 'Location was successfully updated.' }
        format.json { render :show, status: :ok, location: @location }
      else
        format.html { render :edit }
        format.json { render json: @location.errors, status: :unprocessable_entity }
      end
    end
  end


  # PUT /location/1/confirm
  def confirm
    @location = current_user.locations.find(params[:location_id])
    beacon = @location.beacon

    if !beacon.nil? && params[:uuid] == beacon.uuid
      beacon.activate!
      @location.reload
      redirect_to @location, notice: 'Your location has been confirmed!'
    else
      @location.errors.add(:beacon, "The UUID code you entered is invalid. Please try again.")
      render 'confirm'
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_location
      @location = current_user.locations.find(params[:id])
    end

    def set_campaigns_and_greetings
      @greetings = current_user.business.greetings
      @campaigns = current_user.business.campaigns
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def location_params
      params.require(:location).permit(
        :title, 
        :address, 
        :address2, 
        :city, 
        :state, 
        :zipcode, 
        :greeting_id, 
        :latitude, 
        :longitude, 
        :status, 
        :business,
        greeting: [
          :id, 
          :welcome_message, 
          :welcome_reward, 
          :welcome_wait_time, 
          :exit_message, 
          :campaign_id, 
          :campaign_wait_time_quantity, 
          :campaign_wait_time_span
        ]
      )
    end
end
