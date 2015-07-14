require 'rails_helper'

RSpec.describe Membership, type: :model do

  describe "Validations" do
	  it "cannot have less than 0 points" do
  		@customer = FactoryGirl.create(:customer_with_membership)
  		expect( @customer.memberships.length ).to eq 1
	  	expect(FactoryGirl.build(:membership, points: -5)).not_to be_valid
	  end
	end


	describe "Associations" do
		it { should belong_to(:business) }
		it { should belong_to(:customer) }
	end


	describe 'Methods' do
		before :each do
			@business = FactoryGirl.create(:business)
			@customer = FactoryGirl.create(:customer)
			@membership   = FactoryGirl.create(:membership, business: @business, customer: @customer, points: 500)
		end

		it "#increment!(amount)" do
			# This is a rails method, but we are testing it's implementation here
			@membership.increment!(:points, 250)
			@membership.reload
			expect(@membership.points).to eq 750
		end

		describe '#new_visit!' do
			before :each do
				@membership = FactoryGirl.create(:membership, business: @business, customer: @customer, visits: 0, last_visit_at: Date.yesterday)
				@location = FactoryGirl.create(:location, business: @business)
				@greeting = FactoryGirl.create(:greeting, welcome_reward_freq: 'weekly')
				@membership.new_visit!(@greeting.welcome_reward_freq)
			end

			it 'increments the visits' do
				expect(@membership.visits).to eq 1
			end

			it 'updates the last_visit_at' do
				expect(@membership.last_visit_at.to_date).to eq Date.today
			end

			it 'sets the welcome_reward_valid_at accordingly' do
				expect(@membership.welcome_reward_valid_at).to eq 1.week.from_now.to_date
			end
		end

	end

end