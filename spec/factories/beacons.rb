FactoryGirl.define do
	
  factory :beacon do
    location 	nil
		order 		nil
		uuid 			{ Faker::Number.number(10) }
		void 			false
  end

end
