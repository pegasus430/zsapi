require 'rails_helper'

RSpec.describe Location, type: :model do

  describe "Validations" do
    before :each do
  		@location = FactoryGirl.build(:location)
  	end

  	it "has a valid factory" do
  		expect( FactoryGirl.build(:location) ).to be_valid
  	end

  	# Presence
  	%w(address city state zipcode).each do |attr|
	  	it "validates presenve of #{attr}" do
	  		@location.send("#{attr}=", nil)
	  		expect(@location).not_to be_valid
		  end
	 	end

	  # Other
	  it "must have state abbreviation" do
	  	expect( FactoryGirl.build(:location, state: "Tennessee") ).not_to be_valid
	  end
	end


	describe "Associations" do
		it { should have_many :orders }
		# it { should have_many :notifications }
		# it { should have_many :redemptions }

		it { should belong_to :beacon }
		it { should belong_to :business }
		it { should have_many :visits }
		it { should have_many :receipts }
		it { should have_many(:customers), through: :visits }
	end


	describe "Methods" do
		before :all do
			@location = FactoryGirl.build(:location)
		end

		it "#pending?" do
			location = FactoryGirl.create(:location_with_beacon)
			pending_location = FactoryGirl.create(:location)
			expect(location.pending?).to be_falsey
			expect(pending_location.pending?).to be_truthy
		end

		it "#full_address" do
			@location.address = "Street"
			@location.address2 = ""
			@location.city = "Balls"
			@location.state = "TN"
			@location.zipcode = "12345"
			expect(@location.full_address).to eq "Street Balls, TN 12345"
		end
	end


	describe "Scopes" do
		it ".active" do
			FactoryGirl.create_list(:location_with_beacon, 3)
			FactoryGirl.create(:location, beacon: nil)
			expect(Location.active.length).to eq 3
		end

		it ".pending" do
			FactoryGirl.create_list(:location_with_beacon, 3)
			FactoryGirl.create(:location, beacon: nil)
			expect(Location.pending.length).to eq 1
		end
	end


	it "sets the title to the street name if title is blank" do
		my_address = "123 King Street"
		location = FactoryGirl.create(:location, title: nil, address: my_address)
		expect(location.title).to eq my_address + " Location"
	end

end