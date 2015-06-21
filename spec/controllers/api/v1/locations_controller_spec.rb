require 'rails_helper'

RSpec.describe Api::V1::LocationsController, type: :controller do

  describe 'GET #fetch' do
    before :each do
      @location = FactoryGirl.create(:location_with_business)
      customer = FactoryGirl.create(:facebook_customer)
      @wallet = FactoryGirl.create(:wallet, customer: customer, business: @location.business)
    end
    
    context '[Customer token exists]' do
      context '[Location exists]' do
        it 'returns the location' do
          get :fetch, version: 1, id: @location.id
          expect(response).to be_singular_resource
        end
      end

      context '[Location does not exists]' do
        it 'returns with an error' do
          get :fetch, version: 1, id: 55
          expect(response).to be_api_error
        end
      end
    end
  end


  describe 'GET #fetch_nearby' do
    before :each do
      @location = FactoryGirl.create(:location_with_business)
      customer = FactoryGirl.create(:facebook_customer)
      @wallet = FactoryGirl.create(:wallet, customer: customer, business: @location.business)
    end
    
    context '[Customer token exists]' do
      context '[Location exists]' do
        it 'returns the location' do
          get :fetch, version: 1, id: @location.id
          expect(response).to be_singular_resource
        end
      end

      context '[Location does not exists]' do
        it 'returns with an error' do
          get :fetch, version: 1, id: 55
          expect(response).to be_api_error
        end
      end
    end
  end


end