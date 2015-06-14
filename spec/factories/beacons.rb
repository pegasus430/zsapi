FactoryGirl.define do
	
  factory :beacon do
    location 	nil
		payment 		nil
		uuid 			{ Faker::Number.number(10) }
		void 			false
  end

end
