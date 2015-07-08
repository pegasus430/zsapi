require 'rails_helper'

RSpec.describe CustomersController, type: :controller do

  context "[Signed in]" do

    before :each do
      @user = FactoryGirl.create(:user)
      sign_in :user, @user
      @business = FactoryGirl.create(:business, user: @user)
      @all_customers = FactoryGirl.create_list(:customer_with_wallet_without_business, 10, business: @business, status: 'active')
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
          skip
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

        it 'sends an email to the new users imported'

        it 'redirects back to customers index' do
          post :import, file: @file
          expect(response).to redirect_to customers_url
        end
      end

      context '[Valid CSV file with invalid user params]' do
        before :each do
          @file = fixture_file_upload('files/importusers_1_valid_1_invalid.csv', 'text/csv')
        end

        it 'does not create new users' do
          expect {
            post :import, file: @file
          }.to change(Customer, :count).by 1
        end

        it 'shows 0 customers as being created' do
          post :import, file: @file
          expect(assigns(:newly_imported_customers).size).to eq 1
        end

        it 'ignores the negative value of points for the new customer' do
          post :import, file: @file
          expect(Customer.find_by_first_name('C1alton').wallet_for(@business).points).to eq 0
        end

      end
      
      context '[Invalid CSV format]'
    end

  end

end