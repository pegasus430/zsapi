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

	end

end