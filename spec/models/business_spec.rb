require 'rails_helper'

RSpec.describe Business, type: :model do

  describe "Validations" do
    
    before :each do
  		@business = FactoryGirl.build(:business)
  	end

  	it "has a valid factory" do
  		expect( FactoryGirl.create(:business) ).to be_valid
  	end

  	# Presence
  	it "has presence methods" do
  		# validate_presence @business, %w(name primary_color secondary_color published)
  	end

	  # Length
	  it "twitter must be 15 chars or less" do
	  	expect( FactoryGirl.build(:business, twitter: "123456") ).to be_valid
	  	expect( FactoryGirl.build(:business, twitter: "123456789123456789") ).not_to be_valid
	  end

	  # Regex Hex values
	  %w(primary_color secondary_color).each do |color|
	  	it "#{color} should be a valid hex" do

	  		%w(sdf 123ADG).each do |invalid|
	  			@business.send("#{color}=", invalid)
	  			expect( @business ).not_to be_valid
	  		end

	  		%w(336699 FFF).each do |valid|
		  		@business.send("#{color}=", valid)
		  		expect( @business ).to be_valid
		  	end

		  end
		end

	end


	describe "Associations" do
		it { should have_many :locations }
		it { should belong_to :user }
	end


	describe "Methods" do

		before :all do
			@business = FactoryGirl.build(:business)
		end


		it "removes the initial hashtag from hex values" do
			%w(primary_color secondary_color).each do |color|
				business = FactoryGirl.build(:business)
				business.send("#{color}=", "#FFFFFF")
				business.save!
				expect(business.send("#{color}")).to eq "FFFFFF"
			end
		end

	end


end