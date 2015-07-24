FactoryGirl.define do
	
  factory :greeting do
		campaign
		business
		welcome_message				"Hey"
		welcome_reward				100
		welcome_wait_time 		'day'
		exit_message					"Goodbye"
		# campaign_wait_time		{ 3.days.to_i }
		
		# Virtual attributes
		campaign_wait_time_quantity	3
		campaign_wait_time_span			'days'

		factory :invalid_greeting do
			welcome_message ''
			exit_message 		''
		end
  end

end
