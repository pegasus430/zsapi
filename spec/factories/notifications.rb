FactoryGirl.define do
  factory :notification do
    welcome_message "MyString"
welcome_reward 1
welcome_reward_freq 1
exit_message "MyString"
exit_campaign_id nil
exit_freq_days 1
exit_freq_type 1
  end

end
