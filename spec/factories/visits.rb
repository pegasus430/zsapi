FactoryGirl.define do
  factory :visit do
    customer 		nil
		location 		nil
		updated_at 	{ Date.today }
  end

end
