require 'rails_helper'

RSpec.describe ShareLink, type: :model do

  describe "Validations" do
  	  before :each do
  			@share_link = FactoryGirl.build(:share_link)
  		end

  		it "has a valid factory" do
  			expect( FactoryGirl.build(:share_link) ).to be_valid
  		end
	end


	describe "Associations" do
		it { should belong_to(:campaign) }
		it { should belong_to(:customer) }
	end


	describe '#url' do
		it 'displays the referral URL in full' do
			link = FactoryGirl.create(:share_link)
			expect(link.url).not_to be_blank
		end
	end


	describe ".generate_unique_code" do
		it 'creates a unique link' do
			link = FactoryGirl.create(:share_link, :no_code)
			expect(link.code).not_to be_nil
		end

		context '[Code already exists]' do
			it 'generates a new link until unique' do
				FactoryGirl.create(:share_link, code: "abcdefg")
				link = FactoryGirl.create(:share_link, code: "abcdefg")
				expect(link.code).not_to eq "abcdefg"
			end
		end
	end

end