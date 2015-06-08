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
        user = FactoryGirl.create(:user, password: "abcd1234")
        visit customers_url
        fill_in "Email", with: user.email
        fill_in "Password", with: "abcd1234"
        click_button "Log in"
        expect(page).to have_content "Customers"
      end
    end
  end
  ## END NO LOGGED IN


  context "when logged in" do
    # Login before each test
    before :each do
      login_as FactoryGirl.create(:user), scope: :user
    end

    describe "GET /" do
      it "loads the customers index" do 
        visit customers_url
        expect(page).to have_http_status(200)
        expect(page).to have_content "Customers"
      end
    end
  end

end
