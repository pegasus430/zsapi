class CustomersController < ApplicationController

  def index
    @customers = current_user.business.customers
    respond_to do |format|
      format.html
      format.xls { send_data @customers.to_csv(col_sep: "\t")}
    end
  end

  def index_active
    @customers = current_user.business.customers.active
    respond_to do |format|
      format.html { render :index }
      format.xls { send_data @customers.to_csv(col_sep: "\t")}
    end
  end

  def index_inactive
    @customers = current_user.business.customers.inactive
    respond_to do |format|
      format.html { render :index }
      format.xls { send_data @customers.to_csv(col_sep: "\t")}
    end
  end

end