require 'rails_helper'

RSpec.describe Greeting, type: :model do

  describe "Validations" do
    before :each do
  		@greeting = FactoryGirl.build(:greeting)
  	end

  	it "has a valid factory" do
  		expect( FactoryGirl.build(:greeting) ).to be_valid
  	end

  	# Presence
  	%w(welcome_message exit_message).each do |attr|
	  	it "validates presenve of #{attr}" do
	  		@greeting.send("#{attr}=", nil)
	  		expect(@greeting).not_to be_valid
		  end
	 	end

	 	it 'must have more that 1 freq day if exit campaign is selected' do
	 		campaign = FactoryGirl.create(:coupon)
	 		expect(FactoryGirl.build(:greeting, campaign: campaign, campaign_wait_time: 0)).not_to be_valid
	 	end
	end


	describe "Associations" do
		it { should belong_to :campaign }
		it { should belong_to :business }
		it { should have_many :locations }
	end


	describe "Methods" do
		describe '#welcome_wait_time=(duration)' do
			it 'saves a day' do
				greeting = FactoryGirl.create(:greeting, welcome_wait_time: 'day')
				expect(greeting.welcome_wait_time).to eq 1.day.to_i
			end
				
			it 'saves a week' do
				greeting = FactoryGirl.create(:greeting, welcome_wait_time: 'week')
				expect(greeting.welcome_wait_time).to eq 1.week.to_i
			end
				
			it 'saves a month' do
				greeting = FactoryGirl.create(:greeting, welcome_wait_time: 'month')
				expect(greeting.welcome_wait_time).to eq 1.month.to_i
			end
		end		
	end


	describe "Scopes" do
	end

end