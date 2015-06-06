require 'rails_helper'

RSpec.describe Admin::ReceiptsController, type: :controller do


  context "when signed in" do
    before :each do
      sign_in FactoryGirl.create(:admin)
    end

    describe "GET #index" do

      it "assigns all untouched receipts as @receipts" do
        receipt = FactoryGirl.create(:receipt)
        get :index
        expect(assigns(:receipts)).to eq([receipt])
      end

      it "renders the index template" do
        get :index
        expect(response).to render_template :index
      end
    end

    describe "PUT #update" do
      before :each do
        @receipt = FactoryGirl.create(:receipt)
      end

      context "with valid params" do
        it "locates the requested receipt" do
          put :update, id: @receipt, receipt: FactoryGirl.attributes_for(:receipt)
          expect(assigns(:receipt)).to eq(@receipt)
        end

        it "changes the attributes on save" do
          today = Date.today
          put :update, id: @receipt, receipt: FactoryGirl.attributes_for(:receipt, approved_on: today)
          @receipt.reload
          expect(@receipt.approved_on).to eq today
        end
      end

      context "with invalid params" do
        it "locates the requested receipt" do
          put :update, id: @receipt, receipt: FactoryGirl.attributes_for(:receipt)
          expect(assigns(:receipt)).to eq(@receipt)
        end

        it "does not change the attributes" do
          today = Date.today
          put :update, id: @receipt, receipt: FactoryGirl.attributes_for(:invalid_receipt, approved_on: today)
          @receipt.reload
          expect(@receipt.approved_on).not_to eq today
        end

        it "re-renders the index template" do
          put :update, id: @receipt, receipt: FactoryGirl.attributes_for(:invalid_receipt)
          expect(response).to render_template :index
        end
      end
    end

    describe "DELETE #destroy" do
      before :each do
        @receipt = FactoryGirl.create(:receipt)
      end

      it "destroys the requested receipt" do
        expect {
          delete :destroy, id: @receipt
        }.to change(Receipt, :count).by(-1)
      end

      it "redirects to the receipts list" do
        delete :destroy, id: @receipt
        expect(response).to redirect_to(admin_receipts_url)
      end
    end

  end
end