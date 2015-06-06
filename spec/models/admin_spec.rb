require 'rails_helper'

RSpec.describe Admin, type: :model do


  describe "Validations" do
    
    before :each do
  		@admin = FactoryGirl.build(:admin)
  	end

  	it "has a valid factory" do
  		expect( FactoryGirl.create(:admin) ).to be_valid
  	end

  	# Presence
	  it "must have an email address" do
	  	@admin.email = nil
	  	expect(@admin).not_to be_valid
	  end

	  it "must have a password" do
	  	@admin.encrypted_password = nil
	  	expect(@admin).not_to be_valid
	  end

	  it "must have a manage receipt value" do
	  	@admin.manage_receipts = nil
	  	expect(@admin).not_to be_valid
	  end

	  # Unique
	  it "does not allow duplicate email addresses" do
	  	admin = FactoryGirl.create(:admin)
	  	expect( FactoryGirl.build(:admin, email: admin.email) ).not_to be_valid
	  end

	end


end