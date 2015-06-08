require 'rails_helper'

RSpec.describe Customer, type: :model do

  describe "Validations" do
    before :each do
  		@user = FactoryGirl.build(:customer)
  	end

  	it "has a valid factory" do
  		expect( FactoryGirl.build(:customer) ).to be_valid
  	end

  	# Presence
  	%w(first_name last_name email points).each do |attr|
	  	it "validates presenve of #{attr}" do
	  		@user.send("#{attr}=", nil)
	  		expect(@user).not_to be_valid
		  end
	 	end

	  # Unique
	  it "must have a unique email address" do
	  	user = FactoryGirl.create(:customer)
	  	expect( FactoryGirl.build(:customer, email: user.email) ).not_to be_valid
	  end

	  # Other
	  it "cannot have less than 0 points" do
	  	expect(FactoryGirl.build(:customer, points: -5)).not_to be_valid
	  end
	end


	describe "Associations" do
		# it { should have_many :redemptions }
		# it { should have_many :visits }
		# it { should have_many(:locations), through: :visits }
	end


	describe "Methods" do
		before :all do
			@user = FactoryGirl.build(:customer)
		end

		it "#name" do
			@user.first_name = "Wes"
			@user.last_name = "Foster"
			expect( @user.name ).to eq "Wes Foster"
		end

		it "#active?" do
			@user.active = true
			expect(@user.active?).to be_truthy
			@user.active = false
			expect(@user.active?).to be_falsey
		end

		it "#contacted?" do
			@user.contacted = true
			expect(@user.contacted?).to be_truthy
			@user.contacted = false
			expect(@user.contacted?).to be_falsey
		end
	end

end