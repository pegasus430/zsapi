require 'rails_helper'

RSpec.describe Campaign, type: :model do

  describe "Validations" do
    before :each do
  		@campaign = FactoryGirl.build(:campaign)
  	end

  	it "has a valid factory" do
  		expect( FactoryGirl.build(:campaign) ).to be_valid
  	end

  	# Presence
  	%w(type_of title discount_amount discount_type featured active start_at).each do |attr|
	  	it "validates presence of #{attr}" do
	  		@campaign.send("#{attr}=", nil)
	  		expect(@campaign).not_to be_valid
		  end
	 	end
	end


	describe 'Associations' do
		it { should have_and_belong_to_many :locations }
		it { should belong_to :schedule }
		# it { should have_many :redemptions }
	end


	describe 'Methods' do
	end


	describe 'Scopes' do
		it '#active' do
			FactoryGirl.create(:active_campaign)
			FactoryGirl.create(:inactive_campaign)
			expect(Campaign.all.active.size).to eq 1
		end

		it '#inactive' do
			FactoryGirl.create(:active_campaign)
			FactoryGirl.create(:inactive_campaign)
			expect(Campaign.all.inactive.size).to eq 1
		end

		it '#featured' do
			FactoryGirl.create(:featured_campaign)
			FactoryGirl.create(:active_campaign)
			expect(Campaign.all.featured.size).to eq 1
		end

		it '#for_today'
		it '#for_tomorrow'

		describe 'Campaign.[type]' do
			before :each do
				FactoryGirl.create(:coupon)
				FactoryGirl.create(:reward)
				FactoryGirl.create(:special)
			end
			
			it '.coupons' do
				expect(Campaign.coupons.size).to eq 1
			end

			it '.reward' do
				expect(Campaign.rewards.size).to eq 1
			end

			it '.special' do
				expect(Campaign.specials.size).to eq 1
			end
		end
	end

end