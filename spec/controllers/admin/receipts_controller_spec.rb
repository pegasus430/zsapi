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

      context "[valid params]" do
        it "locates the requested receipt" do
          put :update, id: @receipt, receipt: {status: 'approved'}
          expect(assigns(:receipt)).to eq(@receipt)
        end

        it "changes the attributes on save" do
          put :update, id: @receipt, receipt: {amount: 15, status: 'approved'}
          @receipt.reload
          expect(@receipt.amount.to_i).to eq 15
        end

        it "updates the updated_at date when saved" do
          put :update, id: @receipt, receipt: {amount: 15, status: 'approved'}
          @receipt.reload
          expect(@receipt.updated_at).not_to be_blank
        end

        it "redirects to the receipts list" do
          put :update, id: @receipt, receipt: {amount: 15, status: 'approved'}
          expect(response).to redirect_to(admin_receipts_url)
        end

        it "rewards the customer who submitted the receipt" do
          business = FactoryGirl.create(:business, :with_customer, :with_location)
          customer = business.customers.first
          location = business.locations.first
          redemption = FactoryGirl.create(:redemption, customer: customer, location: location)
          receipt = FactoryGirl.create(:receipt, redemption: redemption)

          put :update, id: receipt, receipt: { status: 'approved', amount: 15 }

          customer.reload
          expect(customer.membership_for(business).points).to eq 15
        end

        context "[Redeemer has a referrer]" do
          before :each do
            @business = FactoryGirl.create(:business)
            @location = FactoryGirl.create(:location, business: @business)

            # Referrer and Referral
            @referrer = FactoryGirl.create(:customer)
            @referral = FactoryGirl.create(:customer)

            # The campaign
            @campaign = FactoryGirl.create(:campaign, locations: [@location], share_reward: 25)

            # The referrer creates a share link
            @share_link = FactoryGirl.create(:share_link, campaign: @campaign, customer_id: @referrer.id)

            # The referral views the code
            FactoryGirl.create(:referral, customer_id: @referral.id, referrer: @referrer, campaign: @campaign, share_link: @share_link)

            # The referral redeems the campaign that was shared
            @redemption = FactoryGirl.create(:redemption, campaign: @campaign, customer_id: @referral.id, location: @location)

            # The referral uploads a receipt
            @ref_receipt = FactoryGirl.create(:receipt, redemption: @redemption)
          end

          context "[Hasn't already redeemed]" do
            it "credits the referrer" do
              put :update, id: @ref_receipt, receipt: {status: 'approved', amount: 15}
              expect(@referrer.membership_for(@business).points).to eq 25
            end
          end

          context "[Has already redeemed]" do
            it "does not credit the referrer" do
              put :update, id: @ref_receipt, receipt: {status: 'approved', amount: 15}
              put :update, id: @ref_receipt, receipt: {status: 'approved', amount: 15}
              expect(@referrer.membership_for(@business).points).to eq 25
            end       
          end
        end
      end

      context "[invalid params]" do
        it "locates the requested receipt" do
          put :update, id: @receipt, receipt: FactoryGirl.attributes_for(:receipt)
          expect(assigns(:receipt)).to eq(@receipt)
        end

        it "does not change the attributes" do
          put :update, id: @receipt, receipt: FactoryGirl.attributes_for(:invalid_receipt, amount: 20)
          @receipt.reload
          expect(Receipt.find(@receipt.id).amount.to_i).not_to eq 20
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