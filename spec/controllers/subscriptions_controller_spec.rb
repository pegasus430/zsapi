require 'rails_helper'

RSpec.describe SubscriptionsController, type: :controller do

  context "When signed in" do
    before :each do
      @user = FactoryGirl.create(:user_with_business)
      @location = FactoryGirl.create(:location, business: @user.business)
      sign_in @user
    end

    describe "POST #create" do
      let(:stripe_helper) { StripeMock.create_test_helper }
      before { StripeMock.start }
      after { StripeMock.stop }

      context "with valid params" do
        before :each do
          # Stripe.api_key = Rails.configuration.stripe.secret_key  #< NOT NEEDED FOR MOCK
          @token = stripe_helper.generate_card_token
        end

        it "creates a new subscriptions" do
          expect {
            post :create, location_id: @location, stripeToken: @token, agree: 1, subscription: {stripe_plan_id: 'monthly'}
          }.to change{Subscription.count}.by(1)
        end

        it "creates a beacon" do
          expect {
            post :create, location_id: @location, stripeToken: @token, agree: 1, subscription: {stripe_plan_id: 'monthly'}
          }.to change{Beacon.count}.by(1)
        end

        it 'sends an email to admin' do
          post :create, location_id: @location, stripeToken: @token, agree: 1, subscription: {stripe_plan_id: 'monthly'}

          last_email = ActionMailer::Base.deliveries.last
          expect(last_email.body).to have_content "new beacon order"

          clear_mail_deliveries
        end
      end
    end


    describe "DELETE #destroy" do
      let(:stripe_helper) { StripeMock.create_test_helper }
      before { StripeMock.start }
      after { StripeMock.stop }
      let(:plan) { stripe_helper.create_plan(id: 'gold', amount: 1500, trial_period_days: 30) }


      context "with valid params" do
        before :each do
          stripe_customer = @user.find_or_create_stripe_customer(
            source: stripe_helper.generate_card_token
          )
          @subscription = FactoryGirl.create(:subscription, location: @location, stripe_plan_id: plan.id)
          @subscription.start!

          delete :destroy, location_id: @location.id
        end

        it "changes the sub status to canceled" do
          @subscription.reload
          expect(@subscription.status).to eq 'canceled'
        end

        it "cancels the subscription on stripe" do
          stripe_customer = @user.find_or_create_stripe_customer(
            source: stripe_helper.generate_card_token
          )

          expect(stripe_customer.subscriptions.count).to eq 0
        end

        it "sends the admin a cancellation notice" do
          last_email = ActionMailer::Base.deliveries.last
          expect(last_email).to have_content "canceled"

          clear_mail_deliveries
        end
      end
    end

  end
end