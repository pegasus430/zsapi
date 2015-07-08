require 'rails_helper'

RSpec.describe CustomersController, type: :controller do

  context "[Signed in]" do

    before :each do
      @user = FactoryGirl.create(:user)
      sign_in :user, @user
      @business = FactoryGirl.create(:business, user: @user)
      @all_customers = FactoryGirl.create_list(:customer_with_wallet_without_business, 10, business: @business)
      @active_customers = @all_customers.first(5)
      @inactive_customers = @all_customers.last(5).each { |c| c.status = 'inactive'; c.save }
      FactoryGirl.create_list(:customer, 5)
    end


    describe "GET #index" do
      context '[All customers]' do
        it "assigns all customers as @customers" do
          get :index
          expect(assigns(:customers)).to eq(@active_customers + @inactive_customers)
          expect(response).to render_template :index
        end
      end

      context '[Active customers]' do
        it "assigns active customers as @customers and renders index" do
          get :index, status: 'active'
          expect(assigns(:customers)).to eq(@active_customers)
          expect(response).to render_template :index
        end
      end

      context '[Inactive customers]' do
        it "assigns inactive customers as @customers and renders index" do
          get :index, status: 'inactive'
          expect(assigns(:customers)).to eq(@inactive_customers)
          expect(response).to render_template :index
        end
      end
    end


    describe 'POST #import' do
      context '[Valid CSV file]' do
        it 'uploads the file' do
          file = fixture_file_upload('files/importusers.csv', 'text/csv')
          post :import, file: file
        end
      end
    end

  end

end