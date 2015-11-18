class SubscriptionsController < ApplicationController
  before_action :set_location, only: [:new, :create, :destroy]

  def success
  end

  # GET /subscriptions/new
  def new
    if Rails.env == 'test'
      Stripe.api_key = Rails.configuration.stripe.secret_key
      @token = Stripe::Token.create(
        card: {
          number: "4242424242424242",
          exp_month: 6,
          exp_year: 2016,
          cvc: "314"
        },
      )
    end

    @stripe_plans = Stripe::Plan.all
    @subscription = @location.build_subscription
  end

  # POST /subscriptions
  def create
    @stripe_plans = Stripe::Plan.all
    @subscription = Subscription.new(subscription_params)

    card_error = nil

    if @subscription.valid? && params[:agree] && params[:stripeToken]
      begin
        # Create the stripe customer using card details
        stripe_customer = current_user.find_or_create_stripe_customer(
          source: params[:stripeToken]
        )
      rescue Stripe::CardError => e
        card_error = e.message
      end

      if card_error
        flash[:alert] = card_error
        render :new
      else
        # Save subscription
        @subscription.save

        # Create the beacon
        @beacon = Beacon.create(location: @location)
        BeaconMailer.created(@beacon).deliver_now

        render :success
      end
    else
      flash[:alert] = 'You must agree to the Terms of Service' unless params[:agree]
      flash[:alert] = 'There was an error establishing a funding source' unless params[:stripeToken]
      render :new
    end
  end


  def destroy
    subscription = @location.subscription
    stripe_sub = subscription.from_stripe.delete

    if stripe_sub.status == 'canceled'
      subscription.canceled!

      SubscriptionMailer.canceled(subscription).deliver_now
      redirect_to subscription_canceled_url
    else
      flash[:alert] = 'There has been a problem. Your subscription has not been canceled. Please try again, or contact the administrator.'
      render :new
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def subscription_params
      params.require(:subscription).permit(:stripe_plan_id).merge!(location: @location)
    end

    def set_location
      @location = current_user.business.locations.find(params[:location_id])
    end
end
