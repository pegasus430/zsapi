require 'rails_helper'

RSpec.describe LocationsController, type: :controller do

  before :each do
    @user = FactoryGirl.create(:user_with_business)
    @location = FactoryGirl.create(:location, business: @user.business, status: 'pending')
    sign_in @user
  end


  describe 'GET #index' do
    before :each do
      FactoryGirl.create_list(:active_location, 2, business: @user.business)
      FactoryGirl.create_list(:pending_location, 2, business: @user.business)
      
      other_business = FactoryGirl.create(:business)
      FactoryGirl.create_list(:active_location, 2, business: other_business)
      FactoryGirl.create_list(:pending_location, 2, business: other_business)
    end

    it 'assigns @active_locations' do
      get :index
      expect(assigns(:active_locations).size).to eq 2
    end

    it 'assigns @pending_locations' do
      get :index
      expect(assigns(:pending_locations).size).to eq 3
    end

  end


  describe 'GET #show' do
    it 'assigns @location' do
      get :show, id: @location
      expect(assigns(:location)).to eq @user.locations.where(id: @location.id).first
    end
  end


  describe "GET #edit" do
    it "assigns @location" do
      get :edit, id: @location
      expect(assigns(:location)).to eq(@location)
    end

    it "renders the edit template if beacon exists" do
      location_with_beacon = FactoryGirl.create(:active_location, business: @user.business)
      get :edit, id: location_with_beacon
      expect(response).to render_template :edit
    end

    it "renders the confirm template if no beacon" do
      FactoryGirl.create(:location, business: @user.business)
      get :edit, id: @location
      expect(response).to render_template :confirm
    end
  end


  describe "PUT #confirm" do
    context "[Valid UUID]" do
      before :each do
        FactoryGirl.create(:beacon, location: @location)
        FactoryGirl.create(:subscription, location: @location)
        @location.beacon.uuid = "testing"
        @location.beacon.save

        put :confirm, location_id: @location, uuid: "testing"
      end

      it "validates the location on confirm" do
        @location.reload
        expect(@location.active?).to be_truthy
      end
    end

    context "[Beacon doesn't exist]" do
      before :each do
        FactoryGirl.create(:subscription, location: @location)
        put :confirm, location_id: @location, uuid: "balls"
      end

      it "does not validates the location on confirm" do
        expect(@location.active?).to be_falsey
      end
    end

    context "[Beacon exists, but invalid UUID]" do
      before :each do
        FactoryGirl.create(:beacon, location: @location)
        FactoryGirl.create(:subscription, location: @location)
        @location.beacon.uuid = "testing"
        @location.beacon.save

        put :confirm, location_id: @location, uuid: "balls"
      end

      it "does not validates the location on confirm" do
        expect(@location.active?).to be_falsey
      end
    end
  end


  describe "GET #new" do
    it 'builds a location from the current business' do
      get :new
      expect(assigns(:location).business).to eq @user.business
    end

    it 'gets the list of greetings' do
      greetings = FactoryGirl.create_list(:greeting, 3, business: @user.business)
      other_business_greeting = FactoryGirl.create(:greeting, business: FactoryGirl.create(:business))
      get :new
      expect(assigns(:greetings)).to eq greetings
    end

    it 'gets the list of campaigns' do
      campaigns = FactoryGirl.create_list(:campaign, 3, business: @user.business, locations: [@location])
      other_location_campaigns = FactoryGirl.create(:campaign, locations: [FactoryGirl.create(:location)])
      get :new
      expect(assigns(:campaigns).size).to eq campaigns.size
    end
  end


  describe 'POST #create' do
    context '[Valid Location/Greeting Params]' do
      it 'creates the location' do
        expect {
          post :create, id: @location, location: FactoryGirl.attributes_for(:location).merge(greeting: FactoryGirl.attributes_for(:greeting)), new_greeting: "on"
        }.to change(Location,:count).by 1
      end

      context '[Custom greeting checkbox is checked]' do
        it 'creates the greeting' do
          expect {
            post :create, id: @location, location: FactoryGirl.attributes_for(:location).merge(greeting: FactoryGirl.attributes_for(:greeting)), new_greeting: "on"
          }.to change(Greeting,:count).by 1
        end
      end

      context '[Custom greeting title blank]' do
        it 'does not create a new greeting' do
          selected_greeting = FactoryGirl.create(:greeting)
          expect {
            post :create, id: @location, location: FactoryGirl.attributes_for(:location).merge(greeting: FactoryGirl.attributes_for(:invalid_greeting)), new_greeting: "on"
          }.to change(Greeting,:count).by 0
        end

        it 'assigns a greeting to the location' do
          selected_greeting = FactoryGirl.create(:greeting, business: @location.business)
          post :create, id: @location, location: FactoryGirl.attributes_for(:location, greeting_id: selected_greeting.id).merge(greeting: FactoryGirl.attributes_for(:invalid_greeting))
          @location.reload
          expect(@location.greeting.id).to eq selected_greeting.id
        end
      end

      # context '[Valid payment details]' do
      #   before :each do
      #     Stripe.api_key = Rails.configuration.stripe.secret_key
      #     @token = Stripe::Token.create(
      #       card: {
      #         number:     "4242424242424242",
      #         exp_month:  6,
      #         exp_year:   2016,
      #         cvc:        "314"
      #       }
      #     )
      #   end

      #   it 'creates a payment' do
      #     # # Amount in cents
      #     # @amount = 500

      #     # customer = Stripe::Customer.create(
      #     #   :email => 'example@stripe.com',
      #     #   :card  => params[:stripeToken]
      #     # )

      #     # charge = Stripe::Charge.create(
      #     #   :customer    => customer.id,
      #     #   :amount      => @amount,
      #     #   :description => 'Rails Stripe customer',
      #     #   :currency    => 'usd'
      #     # )

      #     # rescue Stripe::CardError => e
      #     #   flash[:error] = e.message
      #     #   redirect_to charges_path
      #     # end
      #   end

      #   it 'creates a beacon'
      #   it 'creates the location'
      # end

      # context '[Invalid payment details]' do
      #   it 'does not create a payment'
      #   it 'does not create a beacon'
      #   it 'does not create a location'
      #   it 'renders the location#new'
      # end
    end

    context '[Invalid location/greeting params]' do
      it 'does not create a payment'
      it 'does not create a beacon'
      it 'does not create a location'
      it 'renders the location#new'
    end
  end


  describe "PUT #update" do
    before :each do
      @location = FactoryGirl.create(:location, business: @user.business, status: 'active')
    end

    context "with valid params" do
      it 'creates a new greeting if checked', focus: true do
        expect{
          put :update, id: @location, location: FactoryGirl.attributes_for(:location).merge(greeting: FactoryGirl.attributes_for(:greeting)), new_greeting: "on"
        }.to change(Greeting,:count).by 1
      end

      it "locates the requested location" do
        put :update, id: @location, location: FactoryGirl.attributes_for(:location)
        expect(assigns(:location)).to eq(@location)
      end

      it "changes the attributes on save" do
        put :update, id: @location, location: FactoryGirl.attributes_for(:location, amount: 15)
        @location.reload
        expect(@location.amount.to_i).to eq 15
      end

      it "redirects to the location" do
        put :update, id: @location, location: FactoryGirl.attributes_for(:location, amount: 15)
        expect(response).to redirect_to(admin_locations_url)
      end
    end

    context "with invalid params" do
      it "locates the requested location" do
        put :update, id: @location, location: FactoryGirl.attributes_for(:location)
        expect(assigns(:location)).to eq(@location)
      end

      it "does not change the attributes" do
        put :update, id: @location, location: FactoryGirl.attributes_for(:invalid_location, amount: 15)
        @location.reload
        expect(@location.amount.to_i).not_to eq 15
      end

      it "re-renders the index template" do
        put :update, id: @location, location: FactoryGirl.attributes_for(:invalid_location)
        expect(response).to render_template :index
      end
    end
  end

end
