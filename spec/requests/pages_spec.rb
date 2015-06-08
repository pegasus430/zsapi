require 'rails_helper'

RSpec.describe "Pages", type: :feature do

  context "when not logged in" do
    describe "GET /admin/" do
      it "loads the dashboard" do 
        visit '/'
        expect(page).to have_http_status(200)
      end

      it "asks the user to login" do
        visit '/'
        expect(page).to have_content "Log in"
      end

      it "redirects the user to the dashboard page after login" do
        user = FactoryGirl.create(:user, password: "abcd1234")
        visit '/'
        fill_in "Email", with: user.email
        fill_in "Password", with: "abcd1234"
        click_button "Log in"
        expect(page).to have_content "Dashboard"
      end
    end
  end

end
