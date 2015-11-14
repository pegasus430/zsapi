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
	  	it "validates presence of #{attr}" do
	  		@greeting.send("#{attr}=", nil)
	  		expect(@greeting).not_to be_valid
		  end
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
				greeting.reload
				expect(greeting.welcome_wait_time).to eq 1.day.to_i
			end
				
			it 'saves a week' do
				greeting = FactoryGirl.create(:greeting, welcome_wait_time: 'week')
				greeting.reload
				expect(greeting.welcome_wait_time).to eq 1.week.to_i
			end
				
			it 'saves a month' do
				greeting = FactoryGirl.create(:greeting, welcome_wait_time: 'month')
				greeting.reload
				expect(greeting.welcome_wait_time).to eq 1.month.to_i
			end
		end	


		describe '#generate_campaign_wait_time(hash)' do
			it 'saves 3 days' do
				greeting = FactoryGirl.create(:greeting, campaign_wait_time_quantity: 3, campaign_wait_time_span: 'days')
				expect(greeting.campaign_wait_time).to eq 3.days.to_i
			end

			it 'defaults to days if not an accepted span' do
				greeting = FactoryGirl.create(:greeting, campaign_wait_time_quantity: 3, campaign_wait_time_span: 'decades')
				expect(greeting.campaign_wait_time).to eq 3.days.to_i
			end

			it 'defaults to 1 if not an accepted quantity' do
				greeting = FactoryGirl.create(:greeting, campaign_wait_time_quantity: 'three', campaign_wait_time_span: 'days')
				expect(greeting.campaign_wait_time).to eq 1.day.to_i
			end
		end		

		describe '#assigned_to_location?' do
			before :each do
				@greeting = FactoryGirl.create(:greeting)
			end

			context '[Attached to locations]' do
				it 'returns true' do
					location = FactoryGirl.create(:location, greeting: @greeting)
					expect(@greeting.assigned_to_location?).to be_truthy
				end
			end

			context '[Not attached to a location]' do
				it 'returns false' do
					expect(@greeting.assigned_to_location?).to be_falsey
				end
			end
		end

	end


	describe "Scopes" do
	end

end