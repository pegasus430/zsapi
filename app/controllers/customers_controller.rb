class CustomersController < ApplicationController

  def index
    @customers = Customer.all
  end

  def index_active
    @customers = Customer.active
    render :index
  end

  def index_inactive
    @customers = Customer.inactive
    render :index
  end

end