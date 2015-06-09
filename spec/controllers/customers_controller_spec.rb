require 'rails_helper'

RSpec.describe CustomersController, type: :controller do

  context "when signed in" do

    before :each do
      @user = FactoryGirl.create(:user)
      sign_in @user
      @business = FactoryGirl.create(:business, user: @user)
      @all_customers = FactoryGirl.create_list(:customer_with_wallet_without_business, 10, business: @business)
      @active_customers = @all_customers.first(5)
      @inactive_customers = @all_customers.last(5).each { |c| c.active = false; c.save }
      FactoryGirl.create_list(:customer, 5)
    end


    describe "GET #index" do
      it "assigns all customers as @customers" do
        get :index
        expect(assigns(:customers)).to eq(@active_customers + @inactive_customers)
        expect(response).to render_template :index
      end
    end


    describe "GET #index_active" do
      it "assigns active customers as @customers and renders index" do
        get :index_active
        expect(assigns(:customers)).to eq(@active_customers)
        expect(response).to render_template :index
      end
    end
    

    describe "GET #index_inactive" do
      it "assigns inactive customers as @customers and renders index" do
        get :index_inactive
        expect(assigns(:customers)).to eq(@inactive_customers)
        expect(response).to render_template :index
      end
    end

  end

end