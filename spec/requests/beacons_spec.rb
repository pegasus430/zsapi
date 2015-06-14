require 'rails_helper'

RSpec.describe "Beacons", type: :feature do

  context "[logged in]" do
    # Login before each test
    before :each do
    	@admin = FactoryGirl.create(:admin)
      @user = FactoryGirl.create(:user_with_business)
      @business = @user.business
      @location = FactoryGirl.create(:location, business: @business)
      @key = "abcdefg"
      @payment = FactoryGirl.create(:payment, location: @location)
      @payment.key = @key
      @payment.save
      login_as @admin, scope: :admin
    end

    describe "GET /beacon/:key" do

      context "[invalid key]" do
        it "should say key is invalid" do
          visit "/beacon/balls"
          expect(page).to have_content "invalid"
        end
      end

      context "[valid key]" do
        before :each do
          visit "/beacon/abcdefg"
        end

        it "loads the beacon page" do 
          expect(page).to have_http_status(200)
          expect(page).to have_content @business.name
          expect(page).to have_content @location.address
        end

        describe "Beacon.create" do
          context "[invalid params]" do
            it "ensures both UUID match each other"
          end

          context "[valid params]" do
            before :all do
              fill_in "Uuid", with: "123456789"
              fill_in "Uuid confirm", with: "123456789"
              click_button "Create beacon"
            end

            it "creates the beacon"
            it "tells the user to ship the beacon to ADDRESS"
            it "sets the payment status to SHIPPED"
            it "emails the customer who created the location"
          end
        end
      end

    end
  end

end