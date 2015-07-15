require 'rails_helper'

RSpec.describe LocationsController, type: :controller do

  before :each do
    @user = FactoryGirl.create(:user_with_business)
    @location = FactoryGirl.create(:location, business: @user.business)
    sign_in @user
  end

  describe 'GET #index' do
    before :each do
      FactoryGirl.create_list(:active_location, 2, business: @user.business)
      FactoryGirl.create_list(:pending_location, 2, business: @user.business)
      
      other_business = FactoryGirl.create(:business)
      FactoryGirl.create_list(:active_location, 2, business: other_business)
    end

    it 'assigns @active_locations' do
      get :index
      expect(assigns(:active_locations).size).to eq 2
    end

    it 'assigns @pending_locations' do
      get :index
      expect(assigns(:pending_locations).size).to eq 2
    end

  end



  describe "GET #edit" do
    it "assigns @location" do
      get :edit, id: @location
      expect(assigns(:location)).to eq(@location)
    end

    it "renders the edit template if beacon exists" do
      location_with_beacon = FactoryGirl.create(:location_with_beacon, business: @user.business)
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
        FactoryGirl.create(:payment, location: @location)
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
        FactoryGirl.create(:payment, location: @location)
        put :confirm, location_id: @location, uuid: "balls"
      end

      it "does not validates the location on confirm" do
        expect(@location.active?).to be_falsey
      end
    end

    context "[Beacon exists, but invalid UUID]" do
      before :each do
        FactoryGirl.create(:beacon, location: @location)
        FactoryGirl.create(:payment, location: @location)
        @location.beacon.uuid = "testing"
        @location.beacon.save

        put :confirm, location_id: @location, uuid: "balls"
      end

      it "does not validates the location on confirm" do
        expect(@location.active?).to be_falsey
      end
    end
  end


  # describe "GET #new" do
  #   it "builds a location from the current business" do
  #     get :new
  #     expect(assigns(:location)).to eq(Location.new(business: @user.business))
  #   end

  #   it "renders the new form" do
  #     get :new
  #     expect(response).to render_template :new
  #   end
  # end

  # describe "PUT #update" do
  #   before :each do
  #     @receipt = FactoryGirl.create(:receipt)
  #   end

  #   context "with valid params" do
  #     it "locates the requested receipt" do
  #       put :update, id: @receipt, receipt: FactoryGirl.attributes_for(:receipt)
  #       expect(assigns(:receipt)).to eq(@receipt)
  #     end

  #     it "changes the attributes on save" do
  #       put :update, id: @receipt, receipt: FactoryGirl.attributes_for(:receipt, amount: 15)
  #       @receipt.reload
  #       expect(@receipt.amount.to_i).to eq 15
  #     end

  #     it "updates the actioned_on date when saved" do
  #       put :update, id: @receipt, receipt: FactoryGirl.attributes_for(:receipt, amount: 15)
  #       @receipt.reload
  #       expect(@receipt.actioned_on).not_to be_blank
  #     end

  #     it "redirects to the receipts list" do
  #       put :update, id: @receipt, receipt: FactoryGirl.attributes_for(:receipt, amount: 15)
  #       expect(response).to redirect_to(admin_receipts_url)
  #     end
  #   end

  #   context "with invalid params" do
  #     it "locates the requested receipt" do
  #       put :update, id: @receipt, receipt: FactoryGirl.attributes_for(:receipt)
  #       expect(assigns(:receipt)).to eq(@receipt)
  #     end

  #     it "does not change the attributes" do
  #       put :update, id: @receipt, receipt: FactoryGirl.attributes_for(:invalid_receipt, amount: 15)
  #       @receipt.reload
  #       expect(@receipt.amount.to_i).not_to eq 15
  #     end

  #     it "re-renders the index template" do
  #       put :update, id: @receipt, receipt: FactoryGirl.attributes_for(:invalid_receipt)
  #       expect(response).to render_template :index
  #     end
  #   end
  # end

  # describe "DELETE #destroy" do
  #   before :each do
  #     @receipt = FactoryGirl.create(:receipt)
  #   end

  #   it "destroys the requested receipt" do
  #     expect {
  #       delete :destroy, id: @receipt
  #     }.to change(Receipt, :count).by(-1)
  #   end

  #   it "redirects to the receipts list" do
  #     delete :destroy, id: @receipt
  #     expect(response).to redirect_to(admin_receipts_url)
  #   end
  # end

end
