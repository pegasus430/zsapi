FactoryGirl.define do
  factory :visit do
    customer 		nil
		location 		nil
		created_at 	{ Date.today }
  end

end
