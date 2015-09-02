require 'rails_helper'

RSpec.describe Api::V1::CampaignsController, type: :controller do
  before(:each) { controller.stub(:api_key_valid?).and_return(true) }

  #####
  describe 'GET #index' do
    context "[Location exists]" do
      it "retrieves the list of campaigns" do
        customer = FactoryGirl.create(:facebook_customer)
        controller.stub(:current_customer).and_return(customer)
        location = FactoryGirl.create(:location, :with_campaign)
        
        get :index, version: 1, id: location.id

        expect(response).to be_collection_resource
      end
    end

    context "[Location does no exist]" do
      it "returns an error" do
        get :index, version: 1, id: 'bbb'
        
        expect(response).to be_api_error
      end
    end
  end


  #####
  describe 'GET #show' do
    context "[Campaign exists]" do
      it "retrieves the list of campaigns" do
        customer = FactoryGirl.create(:facebook_customer)
        controller.stub(:current_customer).and_return(customer)
        campaign = FactoryGirl.create(:campaign)
        get :show, version: 1, id: campaign.id
      end
    end

    context "[Campaign does no exist]" do
      it "returns an error" do
        get :show, version: 1, id: 64
        expect(response).to be_api_error
      end
    end
  end

end