require 'rails_helper'

RSpec.describe Api::V1::CampaignsController, type: :controller do

  # POST /campaigns/redeem
  # Receive:
  #   campaign[
  #     id              # Campaign ID
  #     location_id     # Campaign ID
  #   ]
  # Return: 200
  describe 'POST #redeem' do
    context '[Campaign email exists]' do
      before :each do
        @campaign = FactoryGirl.create(:campaign)
        post :sign_in, version: 1, campaign: FactoryGirl.attributes_for(:facebook_campaign, email: @campaign.email)
      end
      
      it 'finds the campaign and updates the information' do
        @campaign.reload
        expect(@campaign.active).to be_truthy
      end

      it 'returns the campaign object' do
        expect(response).to be_singular_resource
      end
    end

    context '[Campaign email does not exist]' do
      before :each do
        post :sign_in, version: 1, campaign: FactoryGirl.attributes_for(:facebook_campaign)
      end

      it 'creates a new campaign' do
        expect(Campaign.all.count).to eq 1
      end

      it 'returns the campaign object' do
        expect(response).to be_singular_resource
      end
    end
  end



  describe 'POST #sign_out' do
    context '[Campaign token exists]' do
      before :each do
        @campaign = FactoryGirl.create(:facebook_campaign)
        # allow_any_instance_of(Api::V1::CampaignsController).to receive(:authenticate_social).and_return(@campaign)
        # post :sign_out, {version: 1}, {'HTTP_AUTHORIZATION' => ActionController::HttpAuthentication::Token.encode_credentials(@campaign.social_token)}

        post :sign_out, version: 1
      end
      
      it 'finds the campaign and removes the token' do
        @campaign.reload
        expect(@campaign.social_token).to be_nil
      end

      it 'returns true' do
        expect(response.status).to eq 200
      end
    end

    context '[Campaign token does not exist]' do
      before :each do
        FactoryGirl.create(:facebook_campaign, social_token: nil)
        post :sign_out, version: 1
      end

      it 'returns an error' do
        expect(response).to be_api_error
      end
    end
  end



  describe 'POST #notification_token' do
    context '[Campaign token exists]' do
      before :each do
        @campaign = FactoryGirl.create(:facebook_campaign, notification_token: 'AAA')
        post :notification_token, version: 1, notification_token: 'BBB'
      end
      
      it 'finds the campaign and removes the token' do
        @campaign.reload
        expect(@campaign.notification_token).to eq 'BBB'
      end

      it 'returns true' do
        expect(response.status).to eq 200
      end
    end

    context '[Campaign token does not exist]' do
      before :each do
        FactoryGirl.create(:facebook_campaign, social_token: nil)
        post :notification_token, version: 1, notification_token: 'BBB'
      end

      it 'returns an error' do
        expect(response).to be_api_error
      end
    end
  end



  describe 'GET #fetch' do
    context '[Campaign token exists]' do
      it 'returns the campaign object' do
        FactoryGirl.create(:facebook_campaign)
        get :fetch, version: 1
        expect(response).to be_singular_resource
      end
    end

    context '[Campaign token does not exist]' do
      it 'returns an error' do
        FactoryGirl.create(:facebook_campaign, social_token: nil)
        get :fetch, version: 1
        expect(response).to be_api_error
      end
    end
  end


end