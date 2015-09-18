require 'rails_helper'

RSpec.describe BeaconsController, type: :controller do

	context "When signed in" do
	  before :each do
	    @user = FactoryGirl.create(:user_with_business)
	    @location = FactoryGirl.create(:location, business: @user.business)
	    @beacon = FactoryGirl.create(:beacon, location: @location)
	    sign_in @user
	  end

	  describe 'PATCH #update' do
	  	context "[UUID doesn't match]" do
	  		before :each do
	  			patch :update, key: @beacon.creation_key, beacon: {uuid: "12345"}, uuid_confirmation: "54321"
	  		end

	  		it "gives the error" do
	  			expect(response).to render_template :edit
	  		end
	  	end

	  	context "[creation_key doesn't exist]" do
	  		before :each do
	  			patch :update, key: "12345", beacon: {uuid: "12345"}, uuid_confirmation: "12345"
	  		end

	  		it "gives the error" do
	  			expect(response).to render_template :edit
	  		end

	  		it "assigns the @invalid var" do
	  			expect(assigns(:invalid)).to be_truthy
	  		end

	  		it "does not assign a beacon" do
	  			expect(assigns(:beacon)).to be_nil
	  		end
	  	end

	  	context "[UUID is valid]" do
	  		before :each do
	  			patch :update, key: @beacon.creation_key, beacon: {uuid: "12345"}, uuid_confirmation: "12345"
	  		end

	  		it "marks the beacon as shipped" do
	  			@beacon.reload
	  			expect(@beacon.shipped?).to be_truthy
	  		end

	  		it "send the business user an email" do
	  			last_email = ActionMailer::Base.deliveries.last
	  			expect(last_email.body).to have_content "has been shipped"

	  			clear_mail_deliveries
	  		end

	  		it "removes the creation key" do
	  			@beacon.reload
	  			expect(@beacon.creation_key).to be_nil
	  		end
	  	end
	  end

	end
	
end
