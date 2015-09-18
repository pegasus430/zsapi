require 'rails_helper'

RSpec.describe Subscription, type: :model do

  describe "Validations" do
    before :each do
  		@subscription = FactoryGirl.build(:subscription)
  	end

  	it "has a valid factory" do
  		expect( FactoryGirl.create(:subscription) ).to be_valid
  	end

  	# Presence
  	%w(stripe_plan_id).each do |attr|
	  	it "validates presenve of #{attr}" do
	  		@subscription.send("#{attr}=", nil)
	  		expect(@subscription).not_to be_valid
		  end
	 	end
	end


	describe "Associations" do
		it { should belong_to :location }
		# it { should have_many :payments }
	end

end