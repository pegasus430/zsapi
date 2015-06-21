require 'rails_helper'

RSpec.describe Location, type: :model do

	# before :all do 
	#   Geocoder.configure(:lookup => :test)

	#   Geocoder::Lookup::Test.add_stub(
	#   "New York, NY", [
	#     {
	#       'latitude'     => 40.7143528,
	#       'longitude'    => -74.0059731,
	#       'address'      => 'New York, NY, USA',
	#       'state'        => 'New York',
	#       'state_code'   => 'NY',
	#       'country'      => 'United States',
	#       'country_code' => 'US'
	#     }
	#    ]
	#   )
	#  end

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
		# it { should have_many :notifications }
		# it { should have_many :redemptions }

		it { should have_one :beacon }
		it { should have_one :payment }
		it { should belong_to :business }
		it { should have_many :visits }
		it { should have_many :receipts }
		it { should have_one(:user), through: :business }
		it { should have_many(:customers), through: :visits }
	end


	describe "Methods" do
		before :all do
			@location = FactoryGirl.build(:location)
		end

		it 'full_address_changed?' do
			loc = FactoryGirl.create(:location)
			loc.address = 'Changed'
			expect(loc.full_address_changed?).to be_truthy
		end

		it "#active?" do
			location_beacon = FactoryGirl.create(:location_with_beacon)
			location_beacon.beacon.void = false
			expect(location_beacon.active?).to be_truthy

			location_void_beacon = FactoryGirl.create(:location_with_beacon)
			expect(location_void_beacon.active?).to be_falsey

			location_no_beacon = FactoryGirl.create(:location)
			expect(location_no_beacon.active?).to be_falsey
		end

		it "#pending?" do
			location_beacon = FactoryGirl.create(:location_with_beacon)
			location_beacon.beacon.void = false
			expect(location_beacon.pending?).to be_falsey

			location_void_beacon = FactoryGirl.create(:location_with_beacon)
			expect(location_void_beacon.pending?).to be_truthy

			location_no_beacon = FactoryGirl.create(:location)
			expect(location_no_beacon.pending?).to be_truthy
		end

		it "#full_address" do
			@location.address = "Street"
			@location.address2 = "ignore"
			@location.city = "Balls"
			@location.state = "TN"
			@location.zipcode = "12345"
			expect(@location.full_address).to eq "Street ignore, Balls, TN 12345"
		end
	end


	describe "Scopes" do
		it ".active" do
			FactoryGirl.create_list(:location_with_beacon, 3)
			FactoryGirl.create(:location)
			expect(Location.active.length).to eq 3
		end

		it ".pending" do
			FactoryGirl.create_list(:location_with_beacon, 3)
			FactoryGirl.create(:location)
			expect(Location.pending.length).to eq 1
		end
	end


	it "sets the title to the street name if title is blank" do
		my_address = "123 King Street"
		location = FactoryGirl.create(:location, title: nil, address: my_address)
		expect(location.title).to eq my_address + " Location"
	end

	it 'adds the lat and long upon create' do
		loc = FactoryGirl.build(:location, address2: '')
		loc.save
		expect(loc.latitude).not_to be_nil
	end

end