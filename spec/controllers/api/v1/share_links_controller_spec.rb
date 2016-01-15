require 'rails_helper'

RSpec.describe Api::V1::ShareLinksController, type: :controller do
  before(:each) { controller.stub(:api_key_valid?).and_return(true) }


  # GET /share_link/:id
  describe 'GET #show' do
    before :each do
      @customer = FactoryGirl.create(:customer)
      controller.stub(:current_customer).and_return(@customer)
      location = FactoryGirl.create(:location, :with_campaign)
      campaign = location.campaigns.first
      @share_link = FactoryGirl.create(:share_link, campaign: campaign, customer: @customer)
    end

    context '[Valid code]' do
      it 'returns the share link campaign' do
        get :show, version: 1, id: @share_link.code
        expect(response).to be_singular_resource
      end

      context '[No referral exists]' do
        it 'creates a referral entry' do
          expect {
            get :show, version: 1, id: @share_link.code
          }.to change{Referral.count}.by 1
        end
      end

      context '[Referral exists]' do
        it 'does not create a new referral entry' do
          FactoryGirl.create(:referral, customer_id: @customer.id, referrer: @share_link.customer, campaign: @share_link.campaign, share_link: @share_link)

          expect {
            get :show, version: 1, id: @share_link.code
          }.to change{Referral.count}.by 0
        end
      end
    end

    context '[Invalid code]' do
      it 'returns an error' do
        get :show, version: 1, id: 'invalid'
        expect(response).to be_api_error
      end
    end
  end


  # POST /share_link
  describe 'POST #create' do
    context '[Does not exist for customer/campaign]' do
      it 'creates the share link' do
        customer = FactoryGirl.create(:customer)
        controller.stub(:current_customer).and_return(customer)
        campaign = FactoryGirl.create(:campaign)

        expect{
          post :create, version: 1, share_link: {campaign_id: campaign.id}
        }.to change{ShareLink.count}.by 1
      end

      it 'returns the URL' do
        customer = FactoryGirl.create(:customer)
        controller.stub(:current_customer).and_return(customer)
        campaign = FactoryGirl.create(:campaign)

        post :create, version: 1, share_link: {campaign_id: campaign.id}
        expect(response).to be_singular_resource
      end
    end

    context '[Exists for campaign (not customer)]' do
      it 'creates a new share link' do
        customer = FactoryGirl.create(:customer)
        other_customer = FactoryGirl.create(:customer)
        campaign = FactoryGirl.create(:campaign)
        controller.stub(:current_customer).and_return(other_customer)
        
        # Existing share link for customer and campaign
        FactoryGirl.create(:share_link, customer: customer, campaign: campaign)

        expect{
          post :create, version: 1, share_link: {campaign_id: campaign.id}
        }.to change{ShareLink.count}.by 1
      end
    end

    context '[Exists for customer/campaign]' do
      it 'does not create a new link' do
        customer = FactoryGirl.create(:customer)
        campaign = FactoryGirl.create(:campaign)
        controller.stub(:current_customer).and_return(customer)
        
        # Existing share link for customer and campaign
        FactoryGirl.create(:share_link, customer: customer, campaign: campaign)

        expect{
          post :create, version: 1, share_link: {campaign_id: campaign.id}
        }.to change{ShareLink.count}.by 0
      end

      it 'returns the existing share link' do
        customer = FactoryGirl.create(:customer)
        campaign = FactoryGirl.create(:campaign)
        controller.stub(:current_customer).and_return(customer)
        
        # Existing share link for customer and campaign
        share_link = FactoryGirl.create(:share_link, customer: customer, campaign: campaign)

        post :create, version: 1, share_link: {campaign_id: campaign.id}
        
        expect(JSON.parse(response.body)['response']['url']).to eq share_link.url
      end
    end
  end

end