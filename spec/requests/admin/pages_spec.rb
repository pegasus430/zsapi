require 'rails_helper'

RSpec.describe "Admin::Pages", type: :feature do

  context "when not logged in" do
    describe "GET /admin/" do
      it "loads the page" do 
        visit '/admin/'
        expect(page).to have_http_status(200)
      end

      it "asks the user to login" do
        visit '/admin/'
        expect(page).to have_content "Log in"
      end

      # We'll just keep it on the dashboard for now..........
      # it "redirects the user to the receipts page after login" do
      #   admin = FactoryGirl.create(:admin, password: "abcd1234")
      #   visit '/admin/'
      #   fill_in "Email", with: admin.email
      #   fill_in "Password", with: "abcd1234"
      #   click_button "Log in"
      #   expect(page).to have_content "Receipts"
      # end
    end
  end

end
