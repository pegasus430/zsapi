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

    context '[Redeeming a reward]' do
      context '[Has enough points]' do
        it 'creates a redemption' do
          customer = FactoryGirl.create(:customer_with_membership)
          membership = customer.memberships.first
          membership.update_attribute(:points, 100)
          controller.stub(:current_customer).and_return(customer)
          location = FactoryGirl.create(:location, :with_campaign, business: membership.business)
          campaign = location.campaigns.first
          campaign.reward!
          campaign.update_attribute(:reward_cost, 25)
          
          post :create, version: 1, redemption: {campaign_id: campaign.id, location_id: location.id}
          membership.reload

          expect(membership.points).to eq 75
        end
      end

      context '[NOT enough points]' do
        it 'returns an error' do
          customer = FactoryGirl.create(:customer_with_membership)
          membership = customer.memberships.first
          membership.update_attribute(:points, 5)
          controller.stub(:current_customer).and_return(customer)
          location = FactoryGirl.create(:location, :with_campaign, business: membership.business)
          campaign = location.campaigns.first
          campaign.reward!
          campaign.update_attribute(:reward_cost, 25)
          
          post :create, version: 1, redemption: {campaign_id: campaign.id, location_id: location.id}
          membership.reload

          expect(membership.points).to eq 5
        end
      end
    end
  end

end