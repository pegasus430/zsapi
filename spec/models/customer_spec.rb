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
		it { should have_many(:memberships) }
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

		describe "Points" do
			before :each do
				@business = FactoryGirl.create(:business)
				@customer = FactoryGirl.create(:customer)
				@membership = FactoryGirl.create(:membership, business: @business, customer: @customer, points: 500)
			end

			it "#membership_for(@business)" do
				expect(@customer.membership_for(@business).points).to eq 500
			end


			describe '.find_or_create_with_membership' do
				context '[Customer does not exist]' do
					before :each do
						@customer, @is_new_to_business = Customer.find_or_create_with_membership(FactoryGirl.attributes_for(:customer).merge({points: 500, business: @business}))
					end

					it 'creates the customer' do
						expect(@customer).to be_valid
					end
				
					it 'creates a membership with 500 points' do
						expect(@customer.membership_for(@business).points).to eq 500
					end
				end

			 	context '[Customer exist but does not have membership with business]' do
			 		before :each do
			 			@other_business = FactoryGirl.create(:business)
			 			@found_customer, @is_new_to_business = Customer.find_or_create_with_membership(@customer.attributes.slice('first_name', 'last_name', 'email').symbolize_keys!.merge({points: 500, business: @other_business}))
			 		end

			 		it 'finds the customer' do
			 			expect(@found_customer).to eq @customer
			 		end
			 		
			 		it 'creates a membership with 500 points' do
			 			expect(@found_customer.membership_for(@other_business).points).to eq 500
			 		end
			 	end

			 	context '[Customer exist and has membership with business]' do
			 		before :each do
			 			@found_customer, @is_new_to_business = Customer.find_or_create_with_membership(@customer.attributes.slice('first_name', 'last_name', 'email').symbolize_keys!.merge({points: 250, business: @business}))
			 		end

			 		it 'finds the customer' do
			 			expect(@found_customer).to eq @customer
			 		end
			 		
			 		it 'finds a membership with 500 points and adds 250 more points' do
			 			expect(@found_customer.membership_for(@business).points).to eq 750
			 		end
			 	end
				 
			end
		end

		describe "Visits" do
			it "#visit!" do
				location = FactoryGirl.create(:location_with_business)
				customer = FactoryGirl.create(:customer_with_membership_without_business, business: location.business)
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