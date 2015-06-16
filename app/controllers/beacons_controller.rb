class BeaconsController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :validate_key, only: [:new, :create]

  # GET /beacons/:key
  def new
    @beacon = @payment.location.build_beacon
    @location = @payment.location
    @business = @location.business
  end

  # POST /beacons
  # POST /beacons.json
  def create
    if params[:beacon][:uuid] != params[:uuid_confirm]
      return render :new, alert: "The two UUID codes you entered do not match. Please confirm and try again."
    end

    @beacon = @payment.location.build_beacon(beacon_params)

    respond_to do |format|
      if @beacon.save
        @payment.status = Payment::SHIPPED
        @payment.save

        format.html { render :success }
        PaymentMailer.beacon_shipped_email(@payment).deliver_now
        # format.json { render :show, status: :created, location: @beacon }
      else
        format.html { render :success }
        format.html { redirect_to new_beacon_path(@payment.key) }
        # format.json { render json: @beacon.errors, status: :unprocessable_entity }
      end
    end
  end


  def success

  end


  private

    def beacon_params
      params.require(:beacon).permit(:uuid)
    end

    def validate_key
      @payment = Payment.find_by_key(params[:key])
      if @payment.nil?
        @invalid = true
        render :new
      end
    end
end
