require 'rails_helper'

RSpec.describe Visit, type: :model do

  describe "Validations" do
  	  before :each do
  			@visit = FactoryGirl.build(:visit)
  		end

  		it "has a valid factory" do
  			expect( FactoryGirl.build(:visit) ).to be_valid
  		end

  	# Presence
  	%w(updated_at).each do |attr|
	  	it "validates presenve of #{attr}" do
	  		@visit.send("#{attr}=", nil)
	  		expect(@visit).not_to be_valid
		  end
	 	end
	end


	describe "Associations" do
		it { should belong_to(:customer) }
		it { should belong_to(:location) }
	end


	describe 'Methods' do
		describe '.create_or_increment' do
			before :each do
				@customer = FactoryGirl.create(:customer)
				@location = FactoryGirl.create(:location)
			end

			context '[Visit does not exist]' do
				it 'creates the visit' do
					expect {
						Visit.create_or_increment(customer: @customer, location: @location)
					}.to change{Visit.count}.by(1)
					expect(Visit.last.total).to eq 1
				end
			end

			context '[Visit already exists]' do
				it 'increments the total of the visit' do
					FactoryGirl.create(:visit, customer: @customer, location: @location)
					2.times { Visit.create_or_increment(customer: @customer, location: @location) }
					expect(Visit.last.total).to eq 2
				end
			end
		end
	end

end