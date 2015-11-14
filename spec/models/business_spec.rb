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
  	%w(name).each do |attr|
	  	it "validates presence of #{attr}" do
	  		@business.send("#{attr}=", nil)
	  		expect(@business).not_to be_valid
		  end
	 	end

	  # Length
	  it "twitter must be 15 chars or less" do
	  	expect( FactoryGirl.build(:business, twitter: "123456") ).to be_valid
	  	expect( FactoryGirl.build(:business, twitter: "123456789123456789") ).not_to be_valid
	  end

	  # Regex Hex values
	  %w(primary_color secondary_color).each do |color|
	  	it "#{color} doesn't accept invalid hex" do
	  		%w(sdf 123ADG).each do |invalid|
	  			@business.send("#{color}=", invalid)
	  			expect( @business ).not_to be_valid
	  		end
	  	end

	  	it "#{color} accepts VALID hex" do
	  		%w(336699 FFF).each do |valid|
		  		@business.send("#{color}=", valid)
		  		expect( @business ).to be_valid
		  	end
		  end
		end

	end


	describe "Associations" do
		it { should belong_to :user }
		it { should have_many :locations }
		it { should have_many(:receipts), through: :locations }
		it { should have_many :memberships }
		it { should have_many :greetings }
		it { should have_many(:customers), through: :memberships }

		it { should accept_nested_attributes_for :locations }
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


		describe '#in_trial?' do
			context '[Trial date is set]' do
			  it "returns true" do
		    	business = FactoryGirl.create(:business, trial_ends_at: 30.days.from_now)
		    	expect(business.in_trial?).to be_truthy
			  end
			end

			context "[Trial date not set]" do
				it "returns false" do
					business = FactoryGirl.create(:business, trial_ends_at: nil)
					expect(business.in_trial?).to be_falsey
				end
			end

			context "[Trial date already passed]" do
				it "returns false" do
					business = FactoryGirl.create(:business, trial_ends_at: 2.days.ago)
					expect(business.in_trial?).to be_falsey
				end
			end
		end


		describe "#start_trial!" do
		  context "[Not in trial]" do
		  	it "starts the trial" do
					business = FactoryGirl.create(:business, trial_ends_at: nil)
					business.start_trial!(30.days.from_now)
					business.reload
		  		expect(business.trial_ends_at).not_to be_nil
		  	end
		  end

		  context "[In trial]" do
		  	it "starts the trial" do
					business = FactoryGirl.create(:business, trial_ends_at: 5.days.from_now)
					business.start_trial!(20.days.from_now)
		  		expect(business.trial_ends_at).to eq 5.days.from_now.to_date
		  	end
		  end
		end


		describe "#trial_days_remaining" do
		  it "returns the number of days in trial" do
		  	business = FactoryGirl.create(:business, trial_ends_at: 15.days.from_now)

		  	expect(business.trial_days_remaining).to eq 15
		  end
		end

	end


end