class CustomersController < ApplicationController
  before_action :set_customer_list

  def index
    respond_to do |format|
      format.html
      format.xls { send_data @customers.to_csv(col_sep: "\t")}
    end
  end

  def mailchimp_export
    batch_export = []

    @customers.each do |cust|
      batch_export.push({
        email: {email: cust.email},
        merge_vars: {:FNAME => cust.first_name, :LNAME => cust.last_name}
      })
    end

    list_id = '177bc6a041' #temp
    add_subscribers = current_user.mailchimp_client.lists.batch_subscribe(
      id: list_id,
      batch: batch_export
    )

    redirect_to customers_url(status: params[:status]), notice: "#{add_subscribers['add_count']} new subscribers have been emailed to request to be subscribed to your Mailchimp list!"
  end



  private

    def set_customer_list
      @customers = current_user.business.customers.send(params[:status])
    end
end