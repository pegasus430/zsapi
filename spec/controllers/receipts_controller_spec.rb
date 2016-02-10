require 'rails_helper'

RSpec.describe ReceiptsController, type: :controller do

	before :each do
	  @user 		= FactoryGirl.create(:user_with_business)
	  @location = FactoryGirl.create(:location, business: @user.business)
	  sign_in @user
	end

	describe 'GET #index' do
	  before :each do
	    FactoryGirl.create_list(:receipt_approved, 2, purchased_on: 2.days.ago)
	    FactoryGirl.create(:receipt_rejected, purchased_on: 2.days.ago)
	    FactoryGirl.create(:receipt, purchased_on: 2.days.ago)
	  end

	  it 'assigns @approved_receipts' do
	    get :index
	    expect(assigns(:approved_receipts).size).to eq 2
	  end

	  context '[Filtering by date]' do
	  	before :each do
	  		FactoryGirl.create(:receipt_approved, purchased_on: 1.day.ago)
	  		FactoryGirl.create(:receipt_approved, purchased_on: Date.today)
	  		FactoryGirl.create(:receipt_approved, purchased_on: Date.tomorrow)
	  	end

	  	it 'filters the start date only' do
	  		get :index, start_date: 1.day.ago
	  	  expect(assigns(:approved_receipts).size).to eq 1
	  	end

	  	it 'filters the first and end dates' do
	  		get :index, start_date: 1.day.ago, end_date: Date.tomorrow
	  	  expect(assigns(:approved_receipts).size).to eq 3
	  	end
	  end

	  context '[Filtering by location]' do
	  	before :each do
	  		@second_location = FactoryGirl.create(:location, business: @user.business)
		    FactoryGirl.create_list(:receipt_approved, 3, location: @second_location, purchased_on: Date.today)
	  	end

	  	it 'shows the receipts for the specified location' do
	  		get :index, location_id: @second_location
		    expect(assigns(:approved_receipts).size).to eq 3
	  	end

	  	it 'filters by date' do
	  		get :index, location_id: @second_location, start_date: 3.days.ago, end_date: Date.tomorrow
		    expect(assigns(:approved_receipts).size).to eq 3
	  	end
	  end
	end


	describe 'GET #show' do
	  it 'assigns @receipt' do
	    @receipt = FactoryGirl.create(:receipt_approved, location: @location)
	    get :show, id: @receipt
	    expect(assigns(:receipt).id).to eq @user.business.receipts.where(id: @receipt.id).first.id
	  end
	end

end
