class PaymentsController < ApplicationController

  # GET /payments/1
  # GET /payments/1.json
  def show
  end

  # GET /payments/new
  def new
    if Rails.env == 'test'
      Stripe.api_key = Rails.configuration.stripe.secret_key
      @token = Stripe::Token.create(
        :card => {
          :number => "4242424242424242",
          :exp_month => 6,
          :exp_year => 2016,
          :cvc => "314"
        },
      )
    end
    @location = current_user.business.locations.find(params[:location_id])
    @payment = Payment.new
  end

  # POST /payments
  # POST /payments.json
  def create
    @location = current_user.business.locations.find(params[:location_id])
    @payment = Payment.new(location: @location, status: Payment::PROCESSING)
    @payment.buyer_ip = request.remote_ip

    charge_error = nil

    if @payment.valid?
      begin
        customer = Stripe::Customer.create(
          :email => current_user.email,
          :card  => params[:stripeToken])

        charge = Stripe::Charge.create(
          :customer    => customer.id,
          :amount      => Rails.configuration.x.beacon_cost,
          :description => Rails.configuration.x.beacon_description,
          :currency    => 'usd')

      rescue Stripe::CardError => e
        charge_error = e.message
      end

      if charge_error
        flash[:alert] = charge_error
        render :new
      else
        @payment.transaction_id = charge.id
        @payment.save
        PaymentMailer.beacon_creation_email(@payment).deliver_now
        redirect_to url_for(controller: 'payments', action: 'success', location_id: @location.id)
      end
    else
      flash[:alert] = 'One or more errors in your payment'
      render :new
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def payment_params
      params.require(:payment).permit()
    end
end
