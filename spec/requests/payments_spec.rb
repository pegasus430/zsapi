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

#     # This test is for when using stripe.js (because it is simply a button to click)
#    	before :each do
#    		Stripe.api_key = Rails.configuration.stripe.secret_key
#    		@token = Stripe::Token.create(
#    		  :card => {
#    		    :number => "4242424242424242",
#    		    :exp_month => 6,
#    		    :exp_year => 2016,
#    		    :cvc => "314"
#    		  },
#    		)
#        visit "/locations/#{@location.id}/payment/new"
#        click_button 'Create Payment' #stripeToken is in a hidden field
#    	end

      before :each do
        Stripe.api_key = Rails.configuration.stripe.secret_key
        
        visit "/locations/#{@location.id}/payment/new"
          choose "monthly"
          fill_in "card_name",   with: "Timmy Tester"
          fill_in "card_number", with: "4242424242424242"
          fill_in "card_exp_m",  with: "12"
          fill_in "card_exp_y",  with: "2100"
          fill_in "card_cvc",    with: "123"
          check "agree"
          click_button 'Create Subscription' #stripeToken is in a hidden field
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
