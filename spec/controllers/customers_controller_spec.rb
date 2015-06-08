require 'rails_helper'

RSpec.describe CustomersController, type: :controller do

  context "when signed in" do

    before :each do
      sign_in FactoryGirl.create(:user)
    end


    describe "GET #index" do
      it "assigns all customers as @customers" do
        customer = FactoryGirl.create(:customer)
        get :index
        expect(assigns(:customers)).to eq([customer])
        expect(response).to render_template :index
      end
    end


    describe "GET #index_active" do
      it "assigns active customers as @customers and renders index" do
        customer = FactoryGirl.create(:customer)
        get :index_active
        expect(assigns(:customers)).to eq([customer])
        expect(response).to render_template :index
      end
    end
    

    describe "GET #index_inactive" do
      it "assigns inactive customers as @customers and renders index" do
        customer = FactoryGirl.create(:inactive_customer)
        get :index_inactive
        expect(assigns(:customers)).to eq([customer])
        expect(response).to render_template :index
      end
    end

  end

end