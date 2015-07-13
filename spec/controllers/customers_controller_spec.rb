require 'rails_helper'

def clear_mail_deliveries
  ActionMailer::Base.deliveries = []
end

RSpec.describe CustomersController, type: :controller do

  context "[Signed in]" do

    before :each do
      @user = FactoryGirl.create(:user)
      sign_in :user, @user
      @business = FactoryGirl.create(:business, user: @user)
      @all_customers = FactoryGirl.create_list(:customer_with_membership_without_business, 10, business: @business, status: 'active')
      @active_customers = @all_customers.first(5)
      @inactive_customers = @all_customers.last(5).each { |c| c.status = 'inactive'; c.save }
      FactoryGirl.create_list(:customer, 5)
    end


    describe "GET #index" do
      context '[All customers]' do
        it "assigns all customers as @customers" do
          get :index, status: 'all'
          expect(assigns(:customers).size).to eq(@active_customers.size + @inactive_customers.size)
          expect(response).to render_template :index
        end
      end

      context '[Active customers]' do
        it "assigns active customers as @customers and renders index" do
          get :index, status: 'active'
          expect(assigns(:customers).size).to eq(@active_customers.size)
          expect(response).to render_template :index
        end
      end

      context '[Inactive customers]' do
        it "assigns inactive customers as @customers and renders index" do
          get :index, status: 'inactive'
          expect(assigns(:customers).size).to eq(@inactive_customers.size)
          expect(response).to render_template :index
        end
      end
    end


    describe 'POST #import' do
      context '[Valid CSV file]' do
        before :each do
          @file = fixture_file_upload('files/importusers_2_valid.csv', 'text/csv')
        end

        it 'uploads the file and creates the users' do
          expect {
            post :import, file: @file
          }.to change(Customer, :count).by 2
        end

        it 'shows 2 customers as being created' do
          post :import, file: @file
          expect(assigns(:newly_imported_customers).size).to eq 2
        end

        it 'does not send a notify email' do
          last_email = ActionMailer::Base.deliveries.last
          expect(last_email).to be_nil

          clear_mail_deliveries
        end

        it 'redirects back to customers index' do
          post :import, file: @file
          expect(response).to redirect_to customers_url
        end

        context '[Notify imported customers]' do
          it 'sends a custom email to the new users imported' do
            post :import, file: @file, notify: true, message: '{FULL_NAME} Hello'
            last_email = ActionMailer::Base.deliveries.last
            expect(last_email.body).to have_content "Wes Foster Hello"

            clear_mail_deliveries
          end

          it 'sends the default email to the new users imported' do
            post :import, file: @file, notify: true
            last_email = ActionMailer::Base.deliveries.last
            expect(last_email.html_part.body).to have_content "Hello Calton Jammies"

            clear_mail_deliveries
          end

          context '[Importing an pre-existing customer to the business]' do
            it 'does not notify the customers twice to the same business' do
              # Create customers already in DB for business
              wes    = FactoryGirl.create(:customer_with_membership_without_business, business: @business, first_name: 'Wes', last_name: 'Foster', email: 'ww@ww.com')
              calton = FactoryGirl.create(:customer_with_membership_without_business, business: @business, first_name: 'Calton', last_name: 'Jammies', email: 'cj@cs.com')

              # Import the second time
              post :import, file: @file, notify: true
              expect(ActionMailer::Base.deliveries.size).to eq 0

              clear_mail_deliveries
            end

            it 'notifies only the new-to-business customer' do
              # Create customers already in DB
              our_business_cust   = FactoryGirl.create(:customer_with_membership_without_business, business: @business, first_name: 'Wes', last_name: 'Foster', email: 'ww@ww.com')
              other_business_cust = FactoryGirl.create(:customer)

              # Import the file
              post :import, file: @file, notify: true
              expect(ActionMailer::Base.deliveries.size).to eq 1

              clear_mail_deliveries
            end
          end
        end
      end

      context '[Valid CSV file with invalid user params]' do
        before :each do
          @file = fixture_file_upload('files/importusers_1_valid_1_invalid.csv', 'text/csv')
        end

        it 'creates 1 new user' do
          expect {
            post :import, file: @file
          }.to change(Customer, :count).by 1
        end

        it 'shows 1 customers as being created' do
          post :import, file: @file
          expect(assigns(:newly_imported_customers).size).to eq 1
        end

        it 'ignores the negative value of points for the new customer' do
          post :import, file: @file
          expect(Customer.find_by_first_name('C1alton').membership_for(@business).points).to eq 0
        end

        context '[Notify new customers]' do
          it 'only notifies the imported customer' do
            post :import, file: @file, notify: true
            expect(ActionMailer::Base.deliveries.size).to eq 1

            clear_mail_deliveries
          end
        end

      end
      
      context '[Invalid CSV format]' do
        before :each do
          @file = fixture_file_upload('files/importusers_invalid.csv', 'text/csv')
        end

        it 'does not create new users' do
          expect {
            post :import, file: @file
          }.to change(Customer, :count).by 0
        end

        it 'shows 0 customers as being created' do
          post :import, file: @file
          expect(assigns(:newly_imported_customers).size).to eq 0
        end

        it 'redirects to customer index and gives error' do
          post :import, file: @file
          expect(response).to redirect_to customers_url
        end
      end
    end

  end

end