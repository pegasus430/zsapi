require 'rails_helper'

RSpec.describe "Admin::Receipts", type: :feature do

  # Create all the necessary database entries
  before :all do
    FactoryGirl.create(:user) do |u|
      FactoryGirl.create(:business, user: u) do |b|
        FactoryGirl.create(:location, business: b) do |l|
          FactoryGirl.create_list(:receipt, 10, location: l)
        end
      end
    end
  end

  context "when logged in" do
    # Login before each test
    before :each do
      login_as FactoryGirl.create(:admin), scope: :admin
    end

    describe "GET /admin/receipts" do
      it "loads the page" do 
        visit admin_receipts_path
        expect(page).to have_http_status(200)
      end
    end

    describe "PUT /admin/receipts/#" do
      it "approves the receipt" do
        visit admin_receipts_path
        expect {
          fill_in "Amount", with: 15
          click_button "Approve"
        }.to change(Receipt.approved,:count).by(1)
      end

      it "rejects the receipt" do
        visit admin_receipts_path
        expect {
          fill_in "Amount", with: 15
          fill_in "Reject reason", with: "Too bad"
          click_button "Reject"
        }.to change(Receipt.rejected,:count).by(1)
      end
    end
  end

end
