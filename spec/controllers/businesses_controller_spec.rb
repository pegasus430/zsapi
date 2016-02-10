require 'rails_helper'

RSpec.describe BusinessesController, type: :controller do

  # before :each do
  #   @admin =  FactoryGirl.create(:admin)
  #   sign_in @admin
  # end

  # describe "POST #new" do

  #   it "creates the business and primary location" do
  #     post :create, :business => {name: "Name", website: "twitter",
  #       :locations_attributes => {address: "Street", city: "Balls", state: "TN", zipcode: "12345"}
  #     }
  #     expect(Business.last.name).to eq "Name"
  #     expect(Location.last.address).to eq "Street"
  #   end

  # end


  describe "GET #lock" do
    before :each do
      @business = FactoryGirl.create(:business)
    end

    context "[Invalid login]" do
      it "does nothing" do
        get :lock, id: @business.id
        @business.reload

        expect(@business.locked?).to be_falsey
      end
    end

    context "[Valid login]" do
      before :each do
        user = APP_CONFIG['lock_business_username']
        pw = APP_CONFIG['lock_business_password']
        request.env['HTTP_AUTHORIZATION'] = ActionController::HttpAuthentication::Basic.encode_credentials(user,pw)
      end

      it "locks a business" do
        get :lock, id: @business.id
        @business.reload

        expect(@business.locked?).to be_truthy
      end
    end

  end

end
