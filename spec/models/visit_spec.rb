require 'rails_helper'

RSpec.describe Visit, type: :model do

  describe "Validations" do
  	  before :each do
  			@visit = FactoryGirl.build(:visit)
  		end

  		it "has a valid factory" do
  			expect( FactoryGirl.build(:visit) ).to be_valid
  		end

  	# Presence
  	%w(created_at).each do |attr|
	  	it "validates presenve of #{attr}" do
	  		@visit.send("#{attr}=", nil)
	  		expect(@visit).not_to be_valid
		  end
	 	end
	end


	describe "Associations" do
		it { should belong_to(:customer) }
		it { should belong_to(:location) }
	end

end