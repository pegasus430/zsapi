require 'rails_helper'

RSpec.describe Api::V1::LocationsController, type: :controller do
  before(:each) { controller.stub(:api_key_valid?).and_return(true) }

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


  # GET /:id
  describe 'GET #show' do
    before :each do
      @business = FactoryGirl.create(:business, :with_image)
      @location = FactoryGirl.create(:location, business: @business)
      customer = FactoryGirl.create(:facebook_customer)
      controller.stub(:current_customer).and_return(customer)
      @membership = FactoryGirl.create(:membership, customer: customer, business: @location.business)
    end
    
    context '[Customer token exists]' do
      context '[Location exists]' do
        it 'returns the location' do
          get :show, version: 1, id: @location.id
          expect(response).to be_singular_resource
        end

        context "[Using UUID to find location]" do
          it "returns the location" do
            beacon = FactoryGirl.create(:active_beacon, location: @location)
            get :show, version: 1, uuid: beacon.uuid
            expect(response).to be_singular_resource
          end
        end
      end

      context '[Location does not exists]' do
        it 'returns with an error' do
          get :show, version: 1, id: 55
          expect(response).to be_api_error
        end
      end
    end
  end


  # GET /near/:lat|:lon
  describe 'GET #fetch_nearby' do
    before :each do
      @mcdonalds      = FactoryGirl.create(:location_with_business, address: '724 Sango Road', address2: '', city: 'Clarksville', state: 'TN', zipcode: '37043')
      @waffle_house   = FactoryGirl.create(:location_with_business, address: '1114 Tennessee 76', address2: '', city: 'Clarksville', state: 'TN', zipcode: '37043')
      @titans_stadium = FactoryGirl.create(:location_with_business, address: '1 Titans Way', address2: '', city: 'Nashville', state: 'TN', zipcode: '37213')
      
      customer = FactoryGirl.create(:facebook_customer)
      controller.stub(:current_customer).and_return(customer)
      
      @mcd_membership = FactoryGirl.create(:membership, customer: customer, business: @mcdonalds.business)
      @wh_membership  = FactoryGirl.create(:membership, customer: customer, business: @waffle_house.business)
      @ts_membership  = FactoryGirl.create(:membership, customer: customer, business: @titans_stadium.business)
    end
    
    context '[Customer token exists]' do
      before :each do
        get :fetch_nearby, version: 1, lat: '36.5207262', lon: '-87.21959' # CHURCH COORDS
      end

      it 'limits the radius to 1 mile' do
        expect(response.parsed_body['response'].size).to eq 2 #Shouldn't include nashville
      end

      it 'returns the nearby location' do
        expect(response).to be_collection_resource
      end
    end
  end


  # GET /map/:lat|:lon|:distance
  describe 'GET #fetch_map' do
    before :each do
      @mcdonalds = FactoryGirl.create(:location_with_business, address: '724 Sango Road', address2: '', city: 'Clarksville', state: 'TN', zipcode: '37043')
      @waffle_house = FactoryGirl.create(:location_with_business, address: '1114 Tennessee 76', address2: '', city: 'Clarksville', state: 'TN', zipcode: '37043')
      @titans_stadium = FactoryGirl.create(:location_with_business, address: '1 Titans Way', address2: '', city: 'Nashville', state: 'TN', zipcode: '37213')
      customer = FactoryGirl.create(:facebook_customer)
      controller.stub(:current_customer).and_return(customer)
      @mcd_membership = FactoryGirl.create(:membership, customer: customer, business: @mcdonalds.business)
      @wh_membership = FactoryGirl.create(:membership, customer: customer, business: @waffle_house.business)
      @ts_membership = FactoryGirl.create(:membership, customer: customer, business: @titans_stadium.business)
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