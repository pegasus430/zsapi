require 'rails_helper'

RSpec.describe Customer, type: :model do

  describe "Validations" do
    before :each do
  		@customer = FactoryGirl.build(:customer)
  	end

  	it "has a valid factory" do
  		expect( FactoryGirl.build(:customer) ).to be_valid
  	end

  	# Presence
  	%w(first_name last_name email).each do |attr|
	  	it "validates presenve of #{attr}" do
	  		@customer.send("#{attr}=", nil)
	  		expect(@customer).not_to be_valid
		  end
	 	end

	  # Unique
	  it "must have a unique email address" do
	  	customer = FactoryGirl.create(:customer)
	  	expect( FactoryGirl.build(:customer, email: customer.email) ).not_to be_valid
	  end
	end


	describe "Associations" do
		# it { should have_many :redemptions }
		it { should have_many :visits }
		it { should have_many(:locations), through: :visits }
		it { should have_many(:wallets) }
	end


	describe "Methods" do
		before :all do
			@customer = FactoryGirl.build(:customer)
		end

		it "#name" do
			@customer.first_name = "Wes"
			@customer.last_name = "Foster"
			expect( @customer.name ).to eq "Wes Foster"
		end

		it "#name_reversed" do
			@customer.first_name = "Wes"
			@customer.last_name = "Foster"
			expect( @customer.name_reversed ).to eq "Foster, Wes"
		end

		it "#active?" do
			@customer.active!
			expect(@customer.active?).to be_truthy
			@customer.inactive!
			expect(@customer.active?).to be_falsey
		end

		it "#contacted?" do
			@customer.contacted = true
			expect(@customer.contacted?).to be_truthy
			@customer.contacted = false
			expect(@customer.contacted?).to be_falsey
		end

		describe "Points" do
			before :each do
				@business = FactoryGirl.create(:business)
				@customer = FactoryGirl.create(:customer)
				@wallet = FactoryGirl.create(:wallet, business: @business, customer: @customer, points: 500)
			end

			context '[Wallet not set]' do
				it "#points(@business)" do
					expect(@customer.points(@business)).to eq 500
				end

				it "#set_points(amount, @business)" do
					@customer.set_points(250, @business)
					@customer.save
					@customer.reload
					expect(@customer.points(@business)).to eq 250
				end

				it "#increase_points_by(amount, @business)" do
					@customer.increase_points_by(250, @business)
					@customer.save
					@customer.reload
					expect(@customer.points(@business)).to eq 750
				end
			end

			context '[Wallet is set]' do
				before :each do
					@customer.wallet = @business
				end

				it "#points" do
					expect(@customer.points).to eq 500
				end

				it "#set_points(amount)" do
					@customer.set_points(250)
					@customer.save
					@customer.reload
					expect(@customer.points).to eq 250
				end

				it "#increase_points_by(amount)" do
					@customer.increase_points_by(250)
					@customer.save
					@customer.reload
					expect(@customer.points).to eq 750
				end
			end

			context '[On creation of customer]' do
				it 'creates a wallet when a new customer is created' do
					# customer = Customer.create(FactoryGirl.attributes_for(:customer)) do |c|
					# 	c.set_points(500, @business)
					# end

					customer = Customer.create(FactoryGirl.attributes_for(:customer, points: 500, wallet: @business))

					expect(customer.wallets.size).to eq 1
					expect(customer.points(@business)).to eq 500
				end
			end
		end

		describe "Visits" do
			it "#visit!" do
				location = FactoryGirl.create(:location_with_business)
				customer = FactoryGirl.create(:customer_with_wallet_without_business, business: location.business)
				expect{customer.visit!(location)}.to change{Visit.count}.by(1)
			end

			context '[Has visits]' do
				it '#visits_for' do
					customer = FactoryGirl.create(:customer)
					location2 = FactoryGirl.create(:location)
					location3 = FactoryGirl.create(:location)
					2.times { customer.visit!(location2) }
					3.times { customer.visit!(location3) }
					expect(customer.visits_for(location2)).to eq 2
					expect(customer.visits_for(location3)).to eq 3
				end
			end

			context '[No visits]' do
				it '#visits_for' do
					customer = FactoryGirl.create(:customer)
					location = FactoryGirl.create(:location)
					expect(customer.visits_for(location)).to eq 0
				end
			end
		end
	end


	describe "Scopes" do
		it ".active" do
			FactoryGirl.create_list(:active_customer, 3)
			expect(Customer.active.length).to eq 3
		end

		it ".inactive" do
			FactoryGirl.create_list(:inactive_customer, 3)
			expect(Customer.inactive.length).to eq 3
		end
	end



	describe 'social_friends' do
		before :each do
			#setup
			@customer = FactoryGirl.create(:customer)
		end

		context '[Using IDs]' do
			it 'serializes an array on saving the social_friends' do
				#execute
				@customer.social_friends = [1,2,3,4]
				@customer.save

				#verify
				@customer.reload
				expect(@customer.social_friends).to eq [1,2,3,4]
			end
		end

		context '[Using email addresses]' do
			it 'serializes an array on saving the social_friends' do
				#execute
				@customer.social_friends = ['john@smith.com','james@jo.com']
				@customer.save

				#verify
				@customer.reload
				expect(@customer.social_friends).to eq ['john@smith.com','james@jo.com']
			end
		end
	end

end