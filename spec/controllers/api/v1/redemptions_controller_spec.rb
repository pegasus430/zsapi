require 'rails_helper'

RSpec.describe Api::V1::RedemptionsController, type: :controller do
  before(:each) { controller.stub(:api_key_valid?).and_return(true) }

  # GET /redemptions
  describe 'GET #index' do
    it 'returns redempetions with limited association data' do
      customer = FactoryGirl.create(:customer)
      controller.stub(:current_customer).and_return(customer)
      location = FactoryGirl.create(:location, :with_campaign)
      campaign = location.campaigns.first
      FactoryGirl.create(:redemption, campaign: campaign, location: location, customer: customer)
      
      get :index, version: 1
      expect(response).to be_collection_resource
    end
  end

  # POST /redemptions
  describe 'POST #create' do
    it 'creates a redemption' do
      customer = FactoryGirl.create(:customer)
      controller.stub(:current_customer).and_return(customer)
      location = FactoryGirl.create(:location, :with_campaign)
      campaign = location.campaigns.first
      
      expect{
        post :create, version: 1, redemption: {campaign_id: campaign.id, location_id: location.id}
      }.to change{Redemption.count}.by 1
    end
  end

end