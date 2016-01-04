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
  	it "allows a blank uid on creation" do
  		expect{
  			FactoryGirl.create(:beacon, uid: nil)
			}.to change{Beacon.count}.by 1
	 	end

  	it "requires a uid on update" do
  		beacon = FactoryGirl.create(:beacon, uid: nil)
  		beacon.uid = nil
	  	expect(beacon).not_to be_valid
	 	end
	end


	describe "Associations" do
		it { should belong_to(:location) }
		it { should have_one(:subscription), through: :location }
	end


	describe "Methods" do
		it '#active?' do
			beacon = FactoryGirl.create(:active_beacon)
			expect(beacon.active?).to be_truthy
		end

		describe 'activate!' do
			context '[Beacon inactive]' do
				before :each do
					@processing_beacon = FactoryGirl.create(:processing_beacon, :with_location)
					@subscription = FactoryGirl.create(:subscription, location: @processing_beacon.location)
					Subscription.any_instance.stub(:start!).and_return(true)
				end

				it 'activates the inactive beacon' do
					@processing_beacon.activate!
					expect(@processing_beacon).to be_active
				end

				it 'activates the associated location' do
					@processing_beacon.activate!
					expect(@processing_beacon.location).to be_active
				end
			end
		end
	end


	describe 'Actions' do
		it "generates a random key after creating" do
			beacon = FactoryGirl.create(:beacon)
			expect(beacon.creation_key).not_to be_nil
		end
	end

end