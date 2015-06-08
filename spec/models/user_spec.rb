require 'rails_helper'

RSpec.describe User, type: :model do

  describe "Validations" do
    before :each do
  		@user = FactoryGirl.build(:user)
  	end

  	it "has a valid factory" do
  		expect( FactoryGirl.create(:user) ).to be_valid
  	end

  	# Presence
  	%w(email password first_name last_name).each do |attr|
	  	it "validates presenve of #{attr}" do
	  		@user.send("#{attr}=", nil)
	  		expect(@user).not_to be_valid
		  end
	 	end

	  # Unique
	  it "must have a unique email address" do
	  	user = FactoryGirl.create(:user)
	  	expect( FactoryGirl.build(:user, email: user.email) ).not_to be_valid
	  end
	end


	describe "Relations" do
		it { should have_many :businesses }
	end


	describe "Methods" do
		before :all do
			@user = FactoryGirl.build(:user)
		end

		it "#name" do
			@user.first_name = "Wes"
			@user.last_name = "Foster"
			expect( @user.name ).to eq "Wes Foster"
		end
	end

end