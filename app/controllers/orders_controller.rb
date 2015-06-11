class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :edit, :update, :destroy]

  # GET /orders/1
  # GET /orders/1.json
  def show
  end

  # GET /orders/new
  def new
    @order = Order.new
  end

  # GET /orders/1/edit
  def edit
  end

  # POST /orders
  # POST /orders.json
  def create
    @order = Order.new(order_params)
    @order.buyer_ip = request.remote_ip
    
    charge_error = nil

    if @order.valid?
      begin
        customer = Stripe::Customer.create(
          :email => 'example@stripe.com',
          :card  => params[:stripeToken])

        charge = Stripe::Charge.create(
          :customer    => customer.id,
          :amount      => 5000,
          :description => 'Rails Stripe customer',
          :currency    => 'usd')

      rescue Stripe::CardError => e
        charge_error = e.message
      end
      if charge_error
        flash[:error] = charge_error
        render :new
      else
        @order.save
        redirect_to (successful page)
      end
    else
      flash[:error] = 'one or more errors in your order'
      render :new
    end
  end

  # PATCH/PUT /orders/1
  # PATCH/PUT /orders/1.json
  def update
    respond_to do |format|
      if @order.update(order_params)
        format.html { redirect_to @order, notice: 'Order was successfully updated.' }
        format.json { render :show, status: :ok, location: @order }
      else
        format.html { render :edit }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /orders/1
  # DELETE /orders/1.json
  def destroy
    @order.destroy
    respond_to do |format|
      format.html { redirect_to orders_url, notice: 'Order was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def order_params
      params.require(:order).permit(:location_id, :beacon_id, :buyer_ip, :purchase_date, :transaction_id, :key, :status)
    end
end
