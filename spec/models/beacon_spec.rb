require 'rails_helper'

RSpec.describe Beacon, type: :model do

  describe "Validations" do
  	  before :each do
  			@beacon = FactoryGirl.build(:beacon)
  		end

  		it "has a valid factory" do
  			expect( FactoryGirl.build(:beacon) ).to be_valid
  		end

  	# Presence
  	%w(uuid).each do |attr|
	  	it "validates presenve of #{attr}" do
	  		@beacon.send("#{attr}=", nil)
	  		expect(@beacon).not_to be_valid
		  end
	 	end
	end


	describe "Associations" do
		it { should belong_to(:payment) }
		it { should belong_to(:location) }
	end

end