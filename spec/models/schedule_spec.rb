require 'rails_helper'

RSpec.describe Schedule, type: :model do

  describe "Validations" do
    before :each do
  		@schedule = FactoryGirl.build(:schedule)
  	end

  	it "has a valid factory" do
  		expect(@schedule).to be_valid
  	end

  	# Presence
  	%w(title days_of_week weeks_of_month day_numbers).each do |attr|
	  	it "validates presence of #{attr}" do
	  		@schedule.send("#{attr}=", nil)
	  		expect(@schedule).not_to be_valid
		  end
	 	end
	end


	describe 'Associations' do
		it { should have_many :campaigns }
	end


	describe 'Methods' do
	end


	describe 'Scopes' do
		describe '.valid_for(date)' do
			before :each do
				# Create a default schedule that will stay in the DB
				# FactoryGirl.create(:schedule)
			end

			context '[Every monday]' do
				it 'is valid on Monday 6/22' do
					schedule = FactoryGirl.create(:sched_every_monday)
					expect(Schedule.valid_for("2015-06-15".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-06-22".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-06-23".to_date).size).to eq 0
				end
			end

			context '[every other monday]' do
				it 'is valid' do
					schedule = FactoryGirl.create(:sched_every_other_monday)
					expect(Schedule.valid_for("2015-06-01".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-06-15".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-06-08".to_date).size).to eq 0
				end
			end

			context '[every tue and thur]' do
				it 'is valid' do
					schedule = FactoryGirl.create(:sched_every_tue_and_thur)
					expect(Schedule.valid_for("2015-06-09".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-06-18".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-06-19".to_date).size).to eq 0
				end
			end

			context '[always]' do
				it 'is valid' do
					schedule = FactoryGirl.create(:sched_always)
					expect(Schedule.valid_for("2015-06-01".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-06-03".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-06-05".to_date).size).to eq 1
				end
			end

			context '[first day of month]' do
				it 'is valid' do
					schedule = FactoryGirl.create(:sched_first_day_of_month)
					expect(Schedule.valid_for("2015-06-01".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-08-01".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-09-02".to_date).size).to eq 0
				end
			end

			context '[Last day of the month]' do
				it 'is valid' do
					schedule = FactoryGirl.create(:sched_last_day_of_month)
					expect(Schedule.valid_for("2015-06-30".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-07-31".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-08-29".to_date).size).to eq 0
				end
			end

			context '[every day except sunday]' do
				it 'is valid' do
					schedule = FactoryGirl.create(:sched_every_day_except_sunday)
					expect(Schedule.valid_for("2015-06-01".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-06-05".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-06-07".to_date).size).to eq 0
				end
			end

			context '[months with 5 weeks]' do
				it 'is valid' do
					schedule = FactoryGirl.create(:sched_months_with_5_weeks)
					expect(Schedule.valid_for("2015-06-29".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-07-30".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-03-28".to_date).size).to eq 0
				end
			end

			context '[when tue is first day of month]' do
				it 'is valid' do
					schedule = FactoryGirl.create(:sched_when_tue_is_first_day_of_month)
					expect(Schedule.valid_for("2015-09-01".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-12-01".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-06-01".to_date).size).to eq 0
				end
			end

			context '[may 6th through 8th]' do
				it 'is valid' do
					sched = FactoryGirl.create(:sched_always)
					FactoryGirl.create(:campaign, schedule: sched, start_at: "2015-05-06".to_date, end_at: "2015-05-08".to_date)
					expect(Schedule.all.valid_for("2015-05-06".to_date).size).to eq 1
					expect(Schedule.all.valid_for("2015-05-07".to_date).size).to eq 1
					expect(Schedule.all.valid_for("2015-05-08".to_date).size).to eq 1
					expect(Schedule.all.valid_for("2015-05-09".to_date).size).to eq 0
				end
			end


			context '[may 5th only]' do
				it 'is valid' do
					sched = FactoryGirl.create(:sched_always)
					FactoryGirl.create(:campaign, schedule: sched, start_at: "2015-05-05".to_date, end_at: "2015-05-05".to_date )
					expect(Schedule.valid_for("2015-05-05".to_date).size).to eq 1
					expect(Schedule.valid_for("2015-05-04".to_date).size).to eq 0
					expect(Schedule.valid_for("2015-05-06".to_date).size).to eq 0
				end
			end
		end
	end

end