require 'rails_helper'

RSpec.describe Api::V1::CustomersController, type: :controller do

  describe 'POST #sign_in' do
    context '[Customer email exists]' do
      before :each do
        @customer = FactoryGirl.create(:customer)
        post :sign_in, version: 1, customer: FactoryGirl.attributes_for(:facebook_customer, email: @customer.email)
      end
      
      it 'finds the customer and updates the information' do
        @customer.reload
        expect(@customer.active).to be_truthy
      end

      it 'returns the customer object' do
        expect(response).to be_singular_resource
      end
    end

    context '[Customer email does not exist]' do
      before :each do
        post :sign_in, version: 1, customer: FactoryGirl.attributes_for(:facebook_customer)
      end

      it 'creates a new customer' do
        expect(Customer.all.count).to eq 1
      end

      it 'returns the customer object' do
        expect(response).to be_singular_resource
      end
    end
  end



  describe 'POST #sign_out' do
    context '[Customer token exists]' do
      before :each do
        @customer = FactoryGirl.create(:facebook_customer)
        # allow_any_instance_of(Api::V1::CustomersController).to receive(:authenticate_social).and_return(@customer)
        # post :sign_out, {version: 1}, {'HTTP_AUTHORIZATION' => ActionController::HttpAuthentication::Token.encode_credentials(@customer.social_token)}

        post :sign_out, version: 1
      end
      
      it 'finds the customer and removes the token' do
        @customer.reload
        expect(@customer.social_token).to be_nil
      end

      it 'returns true' do
        expect(response.status).to eq 200
      end
    end

    context '[Customer token does not exist]' do
      before :each do
        FactoryGirl.create(:facebook_customer, social_token: nil)
        post :sign_out, version: 1
      end

      it 'returns an error' do
        expect(response).to be_api_error
      end
    end
  end



  describe 'POST #notification_token' do
    context '[Customer token exists]' do
      before :each do
        @customer = FactoryGirl.create(:facebook_customer, notification_token: 'AAA')
        post :notification_token, version: 1, notification_token: 'BBB'
      end
      
      it 'finds the customer and removes the token' do
        @customer.reload
        expect(@customer.notification_token).to eq 'BBB'
      end

      it 'returns true' do
        expect(response.status).to eq 200
      end
    end

    context '[Customer token does not exist]' do
      before :each do
        FactoryGirl.create(:facebook_customer, social_token: nil)
        post :notification_token, version: 1, notification_token: 'BBB'
      end

      it 'returns an error' do
        expect(response).to be_api_error
      end
    end
  end



  describe 'GET #fetch' do
    context '[Customer token exists]' do
      it 'returns the customer object' do
        FactoryGirl.create(:facebook_customer)
        get :fetch, version: 1
        expect(response).to be_singular_resource
      end
    end

    context '[Customer token does not exist]' do
      it 'returns an error' do
        FactoryGirl.create(:facebook_customer, social_token: nil)
        get :fetch, version: 1
        expect(response).to be_api_error
      end
    end
  end


end