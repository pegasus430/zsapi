require 'rails_helper'

RSpec.describe GreetingsController, type: :controller do

  before :each do
    @user = FactoryGirl.create(:user_with_business)
    @greeting = FactoryGirl.create(:greeting)
    @location = FactoryGirl.create(:location, business: @user.business, greeting: @greeting)
    sign_in @user
  end

  describe 'GET #new' do
    before(:each) { get :new, id: @greeting, location_id: @location }

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'builds a new greeting onto the current location' do
      expect(assigns(:greeting).business).to eq @user.business
    end
  end


  describe 'GET #show' do
    before(:each) { get :show, id: @greeting, location_id: @location }
    
    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it '@greeting' do
      expect(assigns(:greeting)).to eq @greeting
    end 

    it '@current_location' do
      expect(assigns(:current_location)).to eq @location
    end 
  end


  describe 'GET #edit' do
    it 'returns http success' do
      get :edit, id: @greeting, location_id: @location
      expect(response).to have_http_status(:success)
    end
  end


  describe 'PUT #update' do
    context '[valid params]' do
      it 'changes the attributes on save' do
        put :update, id: @greeting, location_id: @location.id, greeting: FactoryGirl.attributes_for(:greeting, welcome_reward: 15)
        @greeting.reload
        expect(@greeting.welcome_reward.to_i).to eq 15
      end

      it 'redirects to the greetings list' do
        put :update, id: @greeting, location_id: @location.id, greeting: FactoryGirl.attributes_for(:greeting, welcome_reward: 15)
        expect(response).to redirect_to([@location, @greeting])
      end
    end

    context '[invalid params]' do
      it 'does not change the attributes' do
        put :update, id: @greeting, location_id: @location.id, greeting: FactoryGirl.attributes_for(:invalid_greeting, welcome_reward: 15)
        expect(Greeting.find(@greeting.id).welcome_reward.to_i).not_to eq 15
      end

      it 're-renders the edit template' do
        put :update, id: @greeting, location_id: @location.id, greeting: FactoryGirl.attributes_for(:invalid_greeting)
        expect(response).to render_template :edit
      end
    end
  end

end
