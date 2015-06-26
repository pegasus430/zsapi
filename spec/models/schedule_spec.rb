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


	describe 'Scopes' do
		describe '.valid_for(date)' do
			context '[Every monday]' do
				it 'is valid on Monday 6/22' do
					schedule = FactoryGirl.build(:schedule_every_monday)
					today = "2015-06-22".to_time

					expect(schedule.valid_for?(today)).to be_true
				end
			end
		end
	end

end