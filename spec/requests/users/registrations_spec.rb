require 'rails_helper'

RSpec.describe "Users::Registrations", type: :feature do

  ## NO LOGGED IN
  context "when not logged in" do
    describe "GET /users/sign_up" do
      it "shows the registration form" do 
        visit '/users/sign_up'
        expect(page).to have_http_status(200)
        expect(page).to have_content "Your information"
      end

      it "created a user after signup" do
        visit '/users/sign_up'
        fill_in "First name", with: "john"
        fill_in "Last name", with: "smith"
        fill_in "Email", with: "cats@gogo.com"
        fill_in "Password", with: "balls1234"
        fill_in "Password confirmation", with: "balls1234"
        click_button "Sign up"
        expect(User.last.first_name).to eq "john"
      end
    end
  end
  ## END NO LOGGED IN


  context "when logged in" do
    # Login before each test
    before :each do
      login_as FactoryGirl.create(:user), scope: :user
    end

    describe "GET /users/sign_up" do
      it "redirects to the dashboard" do 
        visit '/users/sign_up'
        expect(page).to have_http_status(200)
        expect(page).to have_content "Dashboard"
      end
    end
  end

end
