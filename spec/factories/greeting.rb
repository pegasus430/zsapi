FactoryGirl.define do
	
  factory :greeting do
		welcome_message				"Hey"
		welcome_reward				100
		welcome_reward_freq		0 # 0=Daily, 1=Weekly, 2=Monthly
		exit_message					"Goodbye"
		exit_campaign_id			1
		exit_freq_days				3
		exit_freq_type				0 # 0=Days, 1=Weeks, 2=Months

		factory :invalid_greeting do
			welcome_message nil
			exit_message 		nil
		end
  end

end
