class BeaconsController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :validate_key, only: [:new, :create]
  layout "bare_application"

  # GET /beacon/:key
  def new
  end

  # POST /beacon/:key
  def create
    if params[:beacon][:uuid] != params[:uuid_confirmation]
      flash[:alert] = "Your UUID does not match!"
      return render :new
    end

    @beacon = Beacon.new(beacon_params)
    @beacon.location = @payment.location

    if @beacon.save
      @payment.shipped!

      PaymentMailer.beacon_shipped_email(@payment).deliver_now
      render :success
    else
      render :new
    end
  end

  # GET /beacon/success
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
      else
        @beacon = @payment.location.build_beacon
        @location = @payment.location
        @business = @location.business
      end
    end
end
