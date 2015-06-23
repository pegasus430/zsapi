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
	 		expect(FactoryGirl.build(:greeting, exit_campaign_id: 1, exit_freq_days: 0)).not_to be_valid
	 	end
	end


	describe "Associations" do
		# it { should belong_to :campaign }
		it { should have_one :location }
	end


	describe "Methods" do
	end


	describe "Scopes" do
	end

end