require 'rails_helper'

RSpec.describe Order, type: :model do

  describe "Validations" do
    before :each do
  		@order = FactoryGirl.build(:order)
  	end

  	it "has a valid factory" do
  		expect( FactoryGirl.create(:order) ).to be_valid
  	end

  	# Presence
  	%w(status).each do |attr|
	  	it "validates presenve of #{attr}" do
	  		@order.send("#{attr}=", nil)
	  		expect(@order).not_to be_valid
		  end
	 	end
	end


	describe "Associations" do
		it { should belong_to :location }
		it { should belong_to :beacon }
	end


	describe "Methods" do
		describe "Statuses" do
		end

		describe "Scopes" do
		end
	end

end