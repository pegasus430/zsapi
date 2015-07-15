FactoryGirl.define do
	
  factory :beacon do
    location
		uuid 			{ Faker::Number.number(10) }
		status    'inactive'

	  factory :inactive_beacon do
			status    'inactive'
	  end

	  factory :active_beacon do
			status    'active'
	  end

  end
end
