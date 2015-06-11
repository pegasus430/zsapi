require 'rails_helper'

RSpec.describe "Businesses", type: :feature do

  ## NO LOGGED IN
  context "when not logged in" do
    describe "GET /businesses/new" do
      it "shows the registration form" do 
        visit '/businesses/new'
        expect(page).to have_http_status(200)
        expect(page).to have_content "sign in"
      end
    end
  end
  ## END NO LOGGED IN


  context "when logged in" do
    # Login before each test
    before :each do
    	@user = FactoryGirl.create(:user)
      login_as @user, scope: :user
    end

    context "when business already exists for user" do
    	before :each do
    		@business = FactoryGirl.create(:business, user: @user)
    	end

	    describe "GET /businesses/new" do
	      it "redirects to the dashboard" do 
	        visit '/businesses/new'
	        expect(page).to have_content "DASHBOARD"
	        expect(page).to have_content "You have already"
	      end
	    end
	  end

    describe "GET /businesses/new" do
      it "shows the form" do 
        visit '/businesses/new'
        expect(page).to have_content "Business details"
      end

      it "creates the business and location on submit" do
      	visit '/businesses/new'
    		fill_in "Name", with: "Business"
    		fill_in "Website", with: "twitter.com"
    		fill_in "Address", with: "Address"
    		fill_in "City", with: "City"
    		fill_in "State", with: "ST"
    		fill_in "Zipcode", with: "12345"
    		click_button "Submit"
      	byebug
      	expect(Business.last.name).to eq "Business"
      end
    end
  end

end
