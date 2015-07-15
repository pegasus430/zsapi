FactoryGirl.define do
	
  factory :greeting do
		campaign
		business
		welcome_message				"Hey"
		welcome_reward				100
		welcome_wait_time 		{ 1.day.to_i }
		exit_message					"Goodbye"
		campaign_wait_time		{ 3.days.to_i }

		factory :invalid_greeting do
			welcome_message nil
			exit_message 		nil
		end
  end

end
