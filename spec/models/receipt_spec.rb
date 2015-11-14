require 'rails_helper'

RSpec.describe Receipt, type: :model do

  describe "Validations" do
    before :each do
  		@receipt = FactoryGirl.build(:receipt)
  	end

  	it "has a valid factory" do
  		expect( FactoryGirl.build(:receipt) ).to be_valid
  	end

  	it 'has an invalid factory' do
  		expect( FactoryGirl.build(:invalid_receipt) ).not_to be_valid
  	end

  	# Presence
  	%w(redemption_id).each do |attr|
	  	it "validates presence of #{attr}" do
	  		@receipt.send("#{attr}=", nil)
	  		expect(@receipt).not_to be_valid
		  end
	 	end

	 	it "must have a reason if rejected" do
	 		expect( FactoryGirl.build(:receipt_rejected, reject_reason: nil) ).not_to be_valid
	 	end
	end


	describe "Associations" do
		it { should belong_to :redemption }
	end


	describe "Methods" do
		describe "Statuses" do
			before :all do
				@untouched 	= FactoryGirl.build(:receipt)
				@approved 	= FactoryGirl.build(:receipt_approved)
				@rejected 	= FactoryGirl.build(:receipt_rejected)
			end

			it "#status" do
				expect( @untouched.status ).to eq 'untouched'
				expect( @approved.status ).to eq 'approved'
				expect( @rejected.status ).to eq 'rejected'
			end

			it "#untouched?" do
				expect( @untouched.untouched? ).to be_truthy
				expect( @approved.untouched? ).to be_falsey
				expect( @rejected.untouched? ).to be_falsey
			end

			it "#approved?" do
				expect( @untouched.approved? ).to be_falsey
				expect( @approved.approved? ).to be_truthy
				expect( @rejected.approved? ).to be_falsey
			end

			it "#rejected?" do
				expect( @untouched.approved? ).to be_falsey
				expect( @approved.rejected? ).to be_falsey
				expect( @rejected.rejected? ).to be_truthy
			end

			it '#reward_points' do
				receipt = FactoryGirl.create(:receipt_approved, amount: 44.63)

				expect(receipt.reward_points).to eq 44
			end
		end

		describe "Scopes" do
			it ".untouched" do
				FactoryGirl.create_list(:receipt, 3)
				expect(Receipt.untouched.length).to eq 3
			end

			it ".approved" do
				FactoryGirl.create_list(:receipt_approved, 3)
				expect(Receipt.approved.length).to eq 3
			end

			it ".rejected" do
				FactoryGirl.create_list(:receipt_rejected, 3)
				expect(Receipt.rejected.length).to eq 3
			end

			it "shows a list of approved receipts from today" do
				FactoryGirl.create(:receipt_approved, updated_at: 2.days.ago)
				FactoryGirl.create(:receipt_approved, updated_at: 1.day.ago)
				FactoryGirl.create(:receipt_approved, updated_at: Time.now)
				FactoryGirl.create(:receipt_approved, updated_at: 2.days.from_now)
				expect(Receipt.approved.from_today.count).to eq 1
			end
		end
	end

end