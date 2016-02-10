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

      describe "Registration Process" do
        before :all do
          visit '/users/sign_up'
          fill_in "First name", with: "john"
          fill_in "Last name", with: "smith"
          fill_in "Email", with: "cats@gogo.com"
          fill_in "Password", with: "balls1234"
          fill_in "Password confirmation", with: "balls1234"
          click_button "Sign up"
          @registered_user = User.last
        end
      
        it "creates a user after signup" do
          expect(@registered_user.first_name).to eq "john"
        end

        it "redirects the user to the new business page after confirm" do
          last_email = ActionMailer::Base.deliveries.last
          ctoken = last_email.body.match(/confirmation_token=(.*?)"/)[1]
          visit "/users/confirmation?confirmation_token=#{ctoken}"
          fill_in "Email", with: "cats@gogo.com"
          fill_in "Password", with: "balls1234"
          click_button "Log in"

          expect(page).to have_content "Business details"
        end
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
        expect(page).to have_content "DASHBOARD"
      end
    end
  end

end
