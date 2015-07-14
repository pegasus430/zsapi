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
		# it { should belong_to :campaign, class_name: "Campaign", foreign_key: :campaign }
		it { should have_many :locations }
	end


	describe "Methods" do
		describe '#say_hello' do
			before :each do
				@business = FactoryGirl.create(:business)
				@customer = FactoryGirl.create(:customer)
				@greeting = FactoryGirl.create(:greeting)
				@location = FactoryGirl.create(:location, business: @business, greeting: @greeting)
			end

			context '[Customer is new. Never exited]' do
				before :each do
					@membership = FactoryGirl.create(:membership,
						business: @business,
						customer: @customer,
						campaign: nil,
						welcome_reward_valid_at: nil
					)
				end
				
				it 'returns the welcome message' do
					result = @customer.check_in_to!(@location)
					expect(result[:message]).to eq "Hey"
				end

				it 'returns the points earned (100)' do
					result = @customer.check_in_to!(@location)
					expect(result[:points_earned]).to eq 100
				end

				it 'returns a nil campaign' do
					result = @customer.check_in_to!(@location)
					expect(result[:campaign]).to be_nil
				end

				it 'adds points earned to customer' do
					result = @customer.check_in_to!(@location)
					@membership.reload
					expect(@membership.points).to eq 600
				end
			end


			context '[Customer returned after exit]' do
				before :each do
					@campaign = FactoryGirl.create(:coupon)
					@membership = FactoryGirl.create(:membership,
						business: @business,
						customer: @customer,
						campaign: @campaign)
				end
				
				it 'returns the exit campaign' do
					result = @customer.check_in_to!(@location)
					expect(result[:campaign]).to eq @campaign
				end

				context '[Before welcome_freq has expired]' do
					it 'does not award points' do
						@membership.welcome_reward_valid_at = Date.tomorrow
						@membership.save

						result = @customer.check_in_to!(@location)

						expect(result[:points_earned]).to eq 0
					end
				end

				context '[AFTER welcome_freq has expired]' do
					it 'awards 100 points' do
						@membership.welcome_reward_valid_at = Date.yesterday
						@membership.save

						result = @customer.check_in_to!(@location)

						expect(result[:points_earned]).to eq 100
					end
				end

			end
		end


		describe '#say_goodbye' do
			before :each do
				@business = FactoryGirl.create(:business)
				@customer = FactoryGirl.create(:customer)
				@greeting = FactoryGirl.create(:greeting)
				@location = FactoryGirl.create(:location, business: @business, greeting: @greeting)
				@membership = FactoryGirl.create(:membership,
					business: @business,
					customer: @customer
				)
			end

			it 'returns the exit message' do
				result = @customer.check_out_from!(@location)
				expect(result[:message]).to eq "Goodbye"
			end

			it 'assigns the exit campaign' do
				result = @customer.check_out_from!(@location)

				@membership.reload
				
				expect(@membership.campaign).not_to be_nil
			end

			it 'sets the campaign expiration date' do
				result = @customer.check_out_from!(@location)

				@membership.reload

				expect(@membership.exit_campaign_expires_at.to_date).to eq 3.days.from_now.to_date
			end

			it 'returns the campaign wait time' do
				result = @customer.check_out_from!(@location)

				expect(result[:wait_time]).to eq 3.days.to_i
			end

			it 'returns the new exit campaign' do
				result = @customer.check_out_from!(@location)
				
				expect(result[:campaign]).to be_a Campaign
			end

		end

	end


	describe "Scopes" do
	end

end