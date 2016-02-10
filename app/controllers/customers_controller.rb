class CustomersController < ApplicationController
  before_action :set_customer_list, only: :index

  def index
    if params[:export] && params[:list]
      mailchimp_export        if params[:export] == 'mc'
      constantcontact_export  if params[:export] == 'cc'
    else
      respond_to do |format|
        format.html
        format.xls { send_data @customers.to_csv(business: current_user.business, csv: {col_sep: "\t"}) }
      end
    end
  end


  def import
    @newly_imported_customers = Customer.import(params[:file], business: current_user.business)

    if params[:notify]
      custom_message = params[:message] ? params[:message] : nil

      @newly_imported_customers.each do |cust|
        CustomerMailer.import_email(customer: cust, business: current_user.business, message: custom_message).deliver_later
      end
    end

    redirect_to customers_url,
                notice: "#{@newly_imported_customers.size} customer(s) imported successfully!"
  end


  private
    def set_customer_list
      @customers = current_user.business.customers.send(params[:status])
    end


    def mailchimp_export
      batch_export = []
      list_id = params[:list]
      # list_id = '177bc6a041' #temp

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

      redirect_to customers_url(status: params[:status]),
        notice: "#{add_subscribers['add_count']} new subscriber(s) were emailed to request to be subscribed to your Mailchimp list!"
    end


    def constantcontact_export
      import_data = []
      lists = [params[:list]]
      # lists = ['2021204636'] #temp
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

      redirect_to customers_url(status: params[:status]),
        notice: "#{add_subscribers.contact_count} new subscriber(s) have been emailed to request to be subscribed to your constantcontact list!"
    end
end