require 'rails_helper'

RSpec.describe Payment, type: :model do

  describe "Validations" do
    before :each do
  		@payment = FactoryGirl.build(:payment)
  	end

  	it "has a valid factory" do
  		expect( FactoryGirl.create(:payment) ).to be_valid
  	end

  	# Presence
  	%w(status).each do |attr|
	  	it "validates presenve of #{attr}" do
	  		@payment.send("#{attr}=", nil)
	  		expect(@payment).not_to be_valid
		  end
	 	end
	end


	describe "Associations" do
		it { should belong_to :location }
		it { should have_one(:beacon), through: :location }
	end


	describe "Methods" do
		describe "Statuses" do
		end

		describe "Scopes" do
		end
	end


	it "generates a random key after creating" do
		payment = FactoryGirl.create(:payment)
		expect(payment.key).not_to be_nil
	end

end