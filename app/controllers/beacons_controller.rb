class BeaconsController < ApplicationController
  skip_before_action :authenticate_user!

  # GET /beacons/:key
  def new
    @payment = Payment.find_by_key(params[:key])

    if @payment.nil?
      @invalid = true
      flash[:alert] = "The confirmation you entered is invalid."
    else
      @beacon = @payment.build_beacon
      @location = @payment.location
      @business = @location.business
    end
  end

  # POST /beacons
  # POST /beacons.json
  def create
    if params[:uuid] != params[:uuid_confirm]
      return render :new, alert: "The two UUID codes you entered do not match. Please confirm and try again."
    end

    if params[:key].blank?
      return render :new, alert: "The payment confirmation key cannot be located. Please click the link in your email and try again."
    end


    @payment = Payment.find_by_key(params[:key])
    @beacon = @payment.beacon.build(beacon_params)

    respond_to do |format|
      if @beacon.save
        @payment.status = Payment::SHIPPED
        @payment.save
        
        format.html { render :new, notice: 'Beacon was successfully created. Go ahead and ship it out!' }
        format.json { render :show, status: :created, location: @beacon }
      else
        format.html { render :new }
        format.json { render json: @beacon.errors, status: :unprocessable_entity }
      end
    end
  end


  private

    def beacon_params
      params.require(:beacon).permit(:uuid)
    end
end
