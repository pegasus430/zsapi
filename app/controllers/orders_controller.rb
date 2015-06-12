class OrdersController < ApplicationController

  # GET /orders/1
  # GET /orders/1.json
  def show
  end

  # GET /orders/new
  def new
    @order = Order.new
  end

  # POST /orders
  # POST /orders.json
  def create
    @order = current_user.locations.find(params[:location_id]).orders.build(status: Order::PROCESSING)
    @order.buyer_ip = request.remote_ip

    charge_error = nil

    if @order.valid?
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
        flash[:error] = charge_error
        render :new
      else
        @order.save
        OrderMailer.beacon_creation_email(@order)
        redirect_to (successful page)
      end
    else
      flash[:error] = 'One or more errors in your order'
      render :new
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def order_params
      params.require(:order).permit()
    end
end
