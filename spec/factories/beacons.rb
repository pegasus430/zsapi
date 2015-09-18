FactoryGirl.define do
	
  factory :beacon do
  	creation_key nil
    location
		uuid 			{ Faker::Number.number(10) }
		status    'processing'

	  factory :processing_beacon do
			status    'processing'
	  end

	  factory :active_beacon do
			status    'active'
	  end

	  trait :with_location do
	  	after :create do |b|
	  		b.location = create(:location)
	  	end
	  end

  end
end
