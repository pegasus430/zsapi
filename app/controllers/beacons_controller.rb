class BeaconsController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :validate_key, only: [:edit, :update]
  layout "bare_application"

  # GET /beacon/:key
  def edit
  end

  # POST /beacon/:key
  def update
    if params[:beacon][:uid] != params[:beacon][:uid_confirmation]
      flash[:alert] = "Your UID does not match!"
      return render :edit
    end

    @beacon.uid = params[:beacon][:uid]
    @beacon.creation_key = nil
    @beacon.status = 'shipped'

    if @beacon.save
      BeaconMailer.shipped(@beacon).deliver_now
      
      render :success
    else
      flash[:alert] = "The UID you entered is invalid."
      render :edit
    end
  end

  # GET /beacon/success
  def success
  end


  private
    def beacon_params
      params.require(:beacon).permit(:uid)
    end

    def validate_key
      @beacon = Beacon.find_by_creation_key(params[:key])
      if @beacon.nil?
        @invalid = true
        render :edit
      else
        @location = @beacon.location
        @business = @location.business
      end
    end
end
