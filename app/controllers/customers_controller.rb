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
    list_id = '177bc6a041' #temp

    @customers.each do |cust|
      batch_export.push({
        email: {email: cust.email},
        merge_vars: {:FNAME => cust.first_name, :LNAME => cust.last_name}
      })
    end

    add_subscribers = current_user.mailchimp_client.lists.batch_subscribe(
      id: list_id,
      batch: batch_export
    )

    redirect_to customers_url(status: params[:status]), notice: "#{add_subscribers['add_count']} new subscribers have been emailed to request to be subscribed to your Mailchimp list!"
  end


  def constantcontact_export
    import_data = []
    lists = ['2021204636'] #temp
    column_names = ["EMAIL","FIRST NAME","LAST NAME"]

    @customers.each do |cust|
      import_data.push({
        email_addresses: [cust.email],
        first_name: cust.first_name,
        last_name: cust.last_name
      })
    end

    add_subscribers = current_user.constantcontact_client.add_create_contacts_activity(
      import_data: import_data,
      lists: lists,
      column_names: column_names
    )

    # REPONSE:
    # contact_count, error_count, id (id of the activity), type ("ADD_CONTACTS")

    redirect_to customers_url(status: params[:status]), notice: "#{add_subscribers['contact_count']} new subscribers have been emailed to request to be subscribed to your constantcontact list!"
  end



  private

    def set_customer_list
      @customers = current_user.business.customers.send(params[:status])
    end
end