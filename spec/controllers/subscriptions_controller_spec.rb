require 'rails_helper'

RSpec.describe SubscriptionsController, type: :controller do

  context "When signed in" do
    before :each do
      @user = FactoryGirl.create(:user_with_business)
      @location = FactoryGirl.create(:location, business: @user.business)
      sign_in @user
    end

    describe "POST #create" do
      context "with valid params" do
        before :each do
          Stripe.api_key = Rails.configuration.stripe.secret_key
          @token = Stripe::Token.create(
            :card => {
              :number => "4242424242424242",
              :exp_month => 6,
              :exp_year => 2016,
              :cvc => "314"
            },
          )
        end

        it "creates a new subscriptions" do
          expect {
            post :create, location_id: @location, stripeToken: @token.id, agree: 1, subscription: {stripe_plan_id: 'monthly'}
          }.to change{Subscription.count}.by(1)
        end

        it "creates a beacon" do
          expect {
            post :create, location_id: @location, stripeToken: @token.id, agree: 1, subscription: {stripe_plan_id: 'monthly'}
          }.to change{Beacon.count}.by(1)
        end

        it 'sends an email to admin' do
          post :create, location_id: @location, stripeToken: @token.id, agree: 1, subscription: {stripe_plan_id: 'monthly'}

          last_email = ActionMailer::Base.deliveries.last
          expect(last_email.body).to have_content "new beacon order"

          clear_mail_deliveries
        end
      end
    end

  end
end