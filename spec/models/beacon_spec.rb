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
		it { should belong_to(:location) }
		it { should have_one(:payment), through: :location }
	end


	describe "Methods" do
		it '#active?' do
			beacon = FactoryGirl.create(:active_beacon)
			expect(beacon.active?).to be_truthy
		end

		describe 'activate!' do
			context '[Beacon inactive]' do
				before :each do
					@inactive_beacon = FactoryGirl.create(:inactive_beacon)
				end

				it 'activates the inactive beacon' do
					@inactive_beacon.activate!
					expect(@inactive_beacon).to be_active
				end
			end
		end

	end

end