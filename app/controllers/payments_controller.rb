class PaymentsController < ApplicationController

  # GET /payments/1
  # GET /payments/1.json
  def show
  end

  def success
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
    @stripe_plans = Stripe::Plan.all
    @payment = @location.build_payment
  end

  # POST /payments
  # POST /payments.json
  def create
    @location = current_user.business.locations.find(params[:location_id])
    @payment = Payment.new(location: @location)
    @payment.buyer_ip = request.remote_ip

    card_error = nil

    if @payment.valid? && params[:agree]
      begin
        # Load stripe customer
        stripe_customer = current_user.find_or_create_stripe_customer(
          :card  => params[:stripeToken]
        )

        # Assign the customer to a plan
        subscription = stripe_customer.subscriptions.create(plan: params[:sub_plan])
      rescue Stripe::CardError => e
        card_error = e.message
      end

      if card_error || subscription.id.blank?
        flash[:alert] = card_error
        render :new
      else
        @payment.transaction_id = subscription.id
        @payment.save
        PaymentMailer.beacon_creation_email(@payment).deliver_now
        render :success
      end
    else
      flash[:alert] = 'You must agree to the Terms of Service'
      render :new
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def payment_params
      params.require(:payment).permit()
    end
end
