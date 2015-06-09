require 'rails_helper'

RSpec.describe Wallet, type: :model do

  describe "Validations" do
	  it "cannot have less than 0 points" do
  		@customer = FactoryGirl.create(:customer_with_wallet)
  		expect( @customer.wallets.length ).to eq 1
	  	expect(FactoryGirl.build(:wallet, points: -5)).not_to be_valid
	  end
	end


	describe "Associations" do
		it { should belong_to(:business) }
		it { should belong_to(:customer) }
	end

end