require 'rails_helper'

RSpec.describe "Beacons", type: :feature do

  context "[logged in]" do

    describe "GET /beacon/:key" do

      # Login before each test
      before :all do
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

      context "[invalid key]" do
        it "should say key is invalid" do
          visit "/beacon/balls"
          expect(page).to have_content "cannot be located"
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
            before :each do
              visit "/beacon/abcdefg"
              fill_in "UUID", with: "123456789"
              fill_in "Uuid confirm", with: "123456789"
              click_button "Create beacon"
            end

            it "creates the beacon" do
              expect(Beacon.all.count).to eq 1
            end

            it "tells the user to ship the beacon to ADDRESS" do
              expect(page).to have_content "Ship this beacon to"
            end

            it "sets the payment status to SHIPPED" do
              expect(Payment.last.status).to eq Payment::SHIPPED
            end

            it "emails the customer who created the location" do
              last_email = ActionMailer::Base.deliveries.last
              expect(last_email.body).to have_content "has been shipped"
            end
          end
        end
      end

    end
  end

end