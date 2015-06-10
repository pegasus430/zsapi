require 'rails_helper'

RSpec.describe "Customers", type: :feature do

  ## NO LOGGED IN
  context "when not logged in" do
    describe "GET /" do
      it "ask the user to login" do 
        visit customers_url
        expect(page).to have_http_status(200)
        expect(page).to have_content "Log in"
      end

      it "redirects the user to the dashboard page after login" do
        user = FactoryGirl.create(:user_with_business)
        visit customers_url
        fill_in "Email", with: user.email
        fill_in "Password", with: "password"
        click_button "Log in"
        expect(page).to have_content "Customers"
      end
    end
  end
  ## END NO LOGGED IN


  context "when logged in" do
    # Login before each test
    before :each do
      @user = FactoryGirl.create(:user_with_business)
      login_as @user, scope: :user
    end

    describe "GET /" do
      it "loads the customers index" do 
        visit customers_url
        expect(page).to have_http_status(200)
        expect(page).to have_content "Customers"
      end

      it "lists the customers" do
        customer = FactoryGirl.create(:customer_with_wallet_without_business, first_name: "John", last_name: "Smith", business: @user.business)
        customer.wallet = @user.business
        customer.set_points(357)
        visit customers_url
        expect(page).to have_content ("Smith, John")
        expect(page).to have_content (customer.email)
        expect(page).to have_content (357)
      end
    end
  end

end
