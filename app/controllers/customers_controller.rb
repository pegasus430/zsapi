class CustomersController < ApplicationController

  def index
    @customers = Customer.all
    respond_to do |format|
      format.html
      format.csv
    end
  end

  def index_active
    @customers = Customer.active
    respond_to do |format|
      format.html { render :index }
      format.csv { send_data @customers.to_csv}
    end
  end

  def index_inactive
    @customers = Customer.inactive
    respond_to do |format|
      format.html { render :index }
      format.csv { send_data @customers.to_csv}
    end
  end

end