require 'rails_helper'

RSpec.describe Api::V1::LocationsController, type: :controller do

  before :all do 
    Geocoder.configure(:lookup => :test)

    addresses = [
      ["3102 Prospect Cir, Clarksville, TN 37043", [{
        'latitude'     => 36.5207262,
        'longitude'    => -87.21959,
        'address'      => '3102 Prospect Cir, Clarksville, TN 37043',
        'state'        => 'Tennessee',
        'state_code'   => 'TN',
        'country'      => 'United States',
        'country_code' => 'US'
      }]],
      ["724 Sango Road, Clarksville, TN 37043", [{
        'latitude'     => 36.5237734,
        'longitude'    => -87.2255686,
        'address'      => '724 Sango Road, Clarksville, TN 37043',
        'state'        => 'Tennessee',
        'state_code'   => 'TN',
        'country'      => 'United States',
        'country_code' => 'US'
      }]],
      ["1114 Tennessee 76, Clarksville, TN 37043", [{
        'latitude'     => 36.5252916,
        'longitude'    => -87.22588329999999,
        'address'      => '1114 Tennessee 76, Clarksville, TN 37043',
        'state'        => 'Tennessee',
        'state_code'   => 'TN',
        'country'      => 'United States',
        'country_code' => 'US'
      }]],
      ["1 Titans Way, Nashville, TN 37213", [{
        'latitude'     => 36.1661644,
        'longitude'    => -86.7717047,
        'address'      => '1 Titans Way, Nashville, TN 37213',
        'state'        => 'Tennessee',
        'state_code'   => 'TN',
        'country'      => 'United States',
        'country_code' => 'US'
      }]],
    ]

    addresses.each { |address| Geocoder::Lookup::Test.add_stub(address[0], address[1])}
  end

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
      @mcdonalds = FactoryGirl.create(:location_with_business, address: '724 Sango Road', address2: '', city: 'Clarksville', state: 'TN', zipcode: '37043')
      @waffle_house = FactoryGirl.create(:location_with_business, address: '1114 Tennessee 76', address2: '', city: 'Clarksville', state: 'TN', zipcode: '37043')
      @titans_stadium = FactoryGirl.create(:location_with_business, address: '1 Titans Way', address2: '', city: 'Nashville', state: 'TN', zipcode: '37213')
      customer = FactoryGirl.create(:facebook_customer)
      @mcd_wallet = FactoryGirl.create(:wallet, customer: customer, business: @mcdonalds.business)
      @wh_wallet = FactoryGirl.create(:wallet, customer: customer, business: @waffle_house.business)
      @ts_wallet = FactoryGirl.create(:wallet, customer: customer, business: @titans_stadium.business)
    end
    
    context '[Customer token exists]' do
      before :each do
        get :fetch_nearby, version: 1, lat: '36.5207262', lon: '-87.21959' # CHURCH COORDS
      end

      it 'limits the radius to 1 mile' do
        expect(JSON.parse(response.body)['response'].size).to eq 2 #Shouldn't include nashville
      end

      it 'returns the nearby location' do
        expect(response).to be_collection_resource
      end
    end
  end

  describe 'GET #fetch_map' do
    before :each do
      @mcdonalds = FactoryGirl.create(:location_with_business, address: '724 Sango Road', address2: '', city: 'Clarksville', state: 'TN', zipcode: '37043')
      @waffle_house = FactoryGirl.create(:location_with_business, address: '1114 Tennessee 76', address2: '', city: 'Clarksville', state: 'TN', zipcode: '37043')
      @titans_stadium = FactoryGirl.create(:location_with_business, address: '1 Titans Way', address2: '', city: 'Nashville', state: 'TN', zipcode: '37213')
      customer = FactoryGirl.create(:facebook_customer)
      @mcd_wallet = FactoryGirl.create(:wallet, customer: customer, business: @mcdonalds.business)
      @wh_wallet = FactoryGirl.create(:wallet, customer: customer, business: @waffle_house.business)
      @ts_wallet = FactoryGirl.create(:wallet, customer: customer, business: @titans_stadium.business)
    end
    
    context '[Customer token exists]' do
      before :each do
        get :fetch_map, version: 1, lat: '36.5207262', lon: '-87.21959', distance: 75 # CHURCH COORDS
      end

      it 'limits the distance to 25 miles' do
        expect(JSON.parse(response.body)['response'].size).to eq 2 #Shouldn't include nashville
      end

      it 'returns the locations in range' do
        expect(response).to be_collection_resource
      end
    end
  end


end