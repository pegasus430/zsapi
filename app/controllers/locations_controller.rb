class LocationsController < ApplicationController
  before_action :set_location, only: [:show, :edit, :update, :destroy]

  # GET /locations
  # GET /locations.json
  def index
    @active_locations  = current_user.business.locations.active
    @pending_locations = current_user.business.locations.pending
  end

  # GET /locations/1
  # GET /locations/1.json
  def show
  end

  # GET /locations/new
  def new
    @location = current_user.business.locations.build
    @greetings = current_user.business.greetings
    @campaigns = current_user.business.campaigns
  end

  # GET /locations/1/edit
  def edit
    if @location.pending?
      render :confirm
    end
  end

  # POST /locations
  # POST /locations.json
  def create
    @location = current_user.business.locations.build(location_params)

    respond_to do |format|
      if @location.save
        format.html { redirect_to location_new_payment_path(@location), notice: 'Location was successfully created. Create the payment now' }      else
        format.html { render :new }
      end
    end
  end

  # PATCH/PUT /locations/1
  # PATCH/PUT /locations/1.json
  def update
    respond_to do |format|
      if @location.update(location_params)
        format.html { redirect_to @location, notice: 'Location was successfully updated.' }
        format.json { render :show, status: :ok, location: @location }
      else
        format.html { render :edit }
        format.json { render json: @location.errors, status: :unprocessable_entity }
      end
    end
  end


  # PUT /location/1/confirm
  def confirm
    @location = current_user.locations.where(id: params[:location_id]).first
    beacon = @location.beacon

    if !beacon.nil? && params[:uuid] == beacon.uuid
      beacon.activate!
      @location.reload
      redirect_to @location, notice: 'Your location has been confirmed!'
    else
      redirect_to @location, alert: 'The UUID code you entered is invalid. Please try again.'
    end
  end

  # DELETE /locations/1
  # DELETE /locations/1.json
  def destroy
    @location.destroy
    respond_to do |format|
      format.html { redirect_to locations_url, notice: 'Location was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_location
      @location = current_user.locations.where(id: params[:id]).first
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def location_params
      params.require(:location).permit(:title, :address, :address2, :city, :state, :zipcode, :greeting_id,
        :greeting_attributes => [:welcome_message, :welcome_reward, :welcome_wait_time, :exit_message, :campaign_id, :campaign_wait_time_quantity, :campaign_wait_time_span]
      )
    end
end
