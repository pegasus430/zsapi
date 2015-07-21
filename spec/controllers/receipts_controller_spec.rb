require 'rails_helper'

RSpec.describe ReceiptsController, type: :controller do

	before :each do
	  @user 		= FactoryGirl.create(:user_with_business)
	  @location = FactoryGirl.create(:location, business: @user.business)
	  sign_in @user
	end

	describe 'GET #index' do
	  before :each do
	    FactoryGirl.create_list(:receipt_approved, 2, location: @user.location)
	    FactoryGirl.create(:receipt_rejected, business: @user.business)
	    FactoryGirl.create(:receipt_untouched, business: @user.business)
	  end

	  it 'assigns @approved_receipts' do
	    get :index
	    expect(assigns(:approved_receipts).size).to eq 2
	  end
	end


	describe 'GET #show' do
	  it 'assigns @receipt' do
	    get :show, id: @receipt
	    expect(assigns(:receipt)).to eq @user.receipts.where(id: @receipt.id).first
	  end
	end


	describe "GET #edit" do
	  it "assigns @receipt" do
	    get :edit, id: @receipt
	    expect(assigns(:receipt)).to eq(@receipt)
	  end

	  it "renders the edit template if beacon exists" do
	    receipt_with_beacon = FactoryGirl.create(:receipt_approved, business: @user.business)
	    get :edit, id: receipt_with_beacon
	    expect(response).to render_template :edit
	  end

	  it "renders the confirm template if no beacon" do
	    FactoryGirl.create(:receipt, business: @user.business)
	    get :edit, id: @receipt
	    expect(response).to render_template :confirm
	  end
	end


	describe "GET #new" do
	  it 'builds a receipt from the current business' do
	    get :new
	    expect(assigns(:receipt).business).to eq @user.business
	  end

	  it 'gets the list of greetings' do
	    greetings = FactoryGirl.create_list(:greeting, 3, business: @user.business)
	    other_business_greeting = FactoryGirl.create(:greeting, business: FactoryGirl.create(:business))
	    get :new
	    expect(assigns(:greetings)).to eq greetings
	  end

	  it 'gets the list of campaigns' do
	    campaigns = FactoryGirl.create_list(:campaign, 3, receipts: [@receipt])
	    other_receipt_campaigns = FactoryGirl.create(:campaign, receipts: [FactoryGirl.create(:receipt)])
	    get :new
	    expect(assigns(:campaigns)).to eq campaigns
	  end
	end

end
