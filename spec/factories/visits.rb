FactoryGirl.define do
  factory :visit do
    customer 			nil
		location 			nil
		last_visit_at { Date.yesterday }
  	last_exit_at 	{ Date.yesterday }
  	total 				0
  end

end
