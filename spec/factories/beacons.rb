FactoryGirl.define do
	
  factory :beacon do
    location
		uuid 			{ Faker::Number.number(10) }
		void 			true
  end

end
