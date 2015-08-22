require 'rails_helper'

RSpec.describe PaymentsController, type: :controller do

  context "When signed in" do
    before :each do
      @user = FactoryGirl.create(:user_with_business)
      @location = FactoryGirl.create(:location, business: @user.business)
      sign_in @user
    end

    # describe "GET #show" do
    #   it "assigns the requested payment as @payment" do
    #     payment = Order.create! valid_attributes
    #     get :show, {:id => payment.to_param}, valid_session
    #     expect(assigns(:payment)).to eq(payment)
    #   end
    # end

    # describe "GET #new" do
    #   it "assigns a new payment as @payment" do
    #     get :new, location_id: @location
    #     expect(assigns(:payment).location).to eq @location
    #   end
    # end

    describe "POST #create" do
      context "with valid params" do

        it "creates a new Payment" do
          Stripe.api_key = Rails.configuration.stripe.secret_key
          @token = Stripe::Token.create(
            :card => {
              :number => "4242424242424242",
              :exp_month => 6,
              :exp_year => 2016,
              :cvc => "314"
            },
          )
          post :create, location_id: @location, stripeToken: @token.id, agree: 1
          expect(Payment.all.count).to eq 1
        end
      end

      # context "with invalid params" do
      #   it "assigns a newly created but unsaved payment as @payment" do
      #     post :create, {:payment => invalid_attributes}, valid_session
      #     expect(assigns(:payment)).to be_a_new(Order)
      #   end

      #   it "re-renders the 'new' template" do
      #     post :create, {:payment => invalid_attributes}, valid_session
      #     expect(response).to render_template("new")
      #   end
      # end
    end

  end
end