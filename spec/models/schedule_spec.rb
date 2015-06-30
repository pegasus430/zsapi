require 'rails_helper'

RSpec.describe Schedule, type: :model do

  describe "Validations" do
    before :each do
  		@schedule = FactoryGirl.build(:schedule)
  	end

  	it "has a valid factory" do
  		expect(@schedule).to be_valid
  	end

  	# Presence
  	%w(title days_of_week weeks_of_month day_numbers).each do |attr|
	  	it "validates presence of #{attr}" do
	  		@schedule.send("#{attr}=", nil)
	  		expect(@schedule).not_to be_valid
		  end
	 	end
	end


	describe 'Associations' do
		it { should have_many :campaigns }
	end


	describe 'Methods' do
	end

end