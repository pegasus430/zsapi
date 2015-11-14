require 'rails_helper'

RSpec.describe CampaignsController, type: :controller do


  context "[Signed in]" do
    before :each do
      @user = FactoryGirl.create(:user)
      sign_in :user, @user
      @business = FactoryGirl.create(:business, user: @user)
      @location = FactoryGirl.create(:location, business: @business)
    end

    describe "GET #index" do
      before :each do
        FactoryGirl.create(:active_campaign, type_of: 'coupon', business: @business)
        FactoryGirl.create(:inactive_campaign, type_of: 'reward', business: @business)
        FactoryGirl.create(:featured_campaign, type_of: 'special', business: @business)
      end

      it "no status or type filter" do
        get :index, status: 'all', type: 'all'
        expect(assigns(:campaigns).size).to eq 3
      end

      it 'status filter' do
        get :index, status: 'active', type: 'all'
        expect(assigns(:campaigns).size).to eq 1
      end

      it 'type filter' do
        get :index, status: 'all', type: 'reward'
        expect(assigns(:campaigns).size).to eq 1
      end

      it 'status and type filter' do
        get :index, status: 'featured', type: 'special'
        expect(assigns(:campaigns).size).to eq 1
      end

      it 'renders the index template' do
        get :index, status: 'all', type: 'all'
        expect(response).to render_template :index
      end
    end


    describe 'POST #create' do
      it 'uploads the file' do
        # post :create, campaign: FactoryGirl.attributes_for(:campaign_with_image)

      end
    end


    describe "GET #show" do
      it 'renders the show template' do
        get :show, id: FactoryGirl.create(:campaign)
        expect(response).to render_template :show
      end
    end


    describe "PUT #update" do
      before :each do
        @campaign = FactoryGirl.create(:active_campaign, business: @business)
      end

      it "locates the requested campaign" do
        put :update, id: @campaign, campaign: FactoryGirl.attributes_for(:active_campaign)
        expect(assigns(:campaign)).to eq(@campaign)
      end

      context "[Valid params]" do
        it "changes the attributes on save" do
          put :update, id: @campaign, campaign: FactoryGirl.attributes_for(:active_campaign, status: 'featured')
          @campaign.reload
          expect(@campaign.status).to eq 'featured'
        end

        it "redirects to the campaign" do
          put :update, id: @campaign, campaign: FactoryGirl.attributes_for(:active_campaign)
          expect(response).to redirect_to(campaign_url(@campaign))
        end
      end

      context "[Invalid params]" do
        it "does not change the attributes" do
          put :update, id: @campaign, campaign: FactoryGirl.attributes_for(:invalid_campaign, referral_reward: 467)
          expect(Campaign.find(@campaign.id).referral_reward.to_i).not_to eq 467
        end

        it "re-renders the campaign template" do
          put :update, id: @campaign, campaign: FactoryGirl.attributes_for(:invalid_campaign)
          expect(response).to render_template :edit
        end
      end
    end


    describe "DELETE #destroy" do
      before :each do
        @campaign = FactoryGirl.create(:active_campaign, business: @business)
      end

      context "[Has a redemption]" do
        it "does not destroy the campaign" do
          FactoryGirl.create(:redemption, campaign: @campaign)

          expect {
            delete :destroy, id: @campaign
          }.to change{Campaign.count}.by 0
        end
      end

      it "destroys the campaign" do
        expect {
          delete :destroy, id: @campaign
        }.to change{Campaign.count}.by -1
      end
    end

  end
end