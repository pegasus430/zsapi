require 'rails_helper'

RSpec.describe Admin, type: :model do


  describe "Validations" do
    
    before :all do
  		@admin = FactoryGirl.build(:admin)
  	end

	  it "must have an email address" do
	  	@admin.email = nil
	  	expect(@admin).not_to be_valid
	  end

	  it "has a password" do
	  	@admin.encrypted_password = nil
	  	expect(@admin).not_to be_valid
	  end

	  it "can manage receipts" do
	  	@admin.manage_receipts = nil
	  	expect(@admin).not_to be_valid
	  end

	end


end