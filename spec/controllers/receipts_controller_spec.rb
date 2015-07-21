require 'rails_helper'

RSpec.describe ReceiptsController, type: :controller do

	before :each do
	  @user 		= FactoryGirl.create(:user_with_business)
	  @location = FactoryGirl.create(:location, business: @user.business)
	  sign_in @user
	end

	describe 'GET #index' do
	  before :each do
	    FactoryGirl.create_list(:receipt_approved, 2, location: @location)
	    FactoryGirl.create(:receipt_rejected, location: @location)
	    FactoryGirl.create(:receipt, location: @location)
	  end

	  it 'assigns @approved_receipts' do
	    get :index
	    expect(assigns(:approved_receipts).size).to eq 2
	  end
	end


	describe 'GET #show' do
	  it 'assigns @receipt' do
	    get :show, id: @receipt
	    expect(assigns(:receipt).id).to eq @user.business.receipts.where(id: @receipt.id).first.id
	  end
	end

end
