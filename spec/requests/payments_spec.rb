require 'rails_helper'

RSpec.describe "Payments", type: :feature do

  context "[logged in]" do
    # Login before each test
    before :each do
    	@user = FactoryGirl.create(:user_with_business)
      @location = FactoryGirl.create(:location, business: @user.business)
      login_as @user, scope: :user
    end

    describe "POST /locations/1/payment/new" do
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
        visit "/locations/#{@location.id}/payment/new"
        click_button 'Create Payment' #stripeToken is in a hidden field
    	end

      it "redirects to the success page" do 
        expect(page).to have_http_status(200)
        expect(page).to have_content "SUCCESS"
      end

      it "creates a new payment" do
      	expect(Payment.all.count).to eq 1
      end

      it "send an email with the order key" do
        last_email = ActionMailer::Base.deliveries.last
        expect(last_email).not_to be_nil
      end
    end
  end

end
