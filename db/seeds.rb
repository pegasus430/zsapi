# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = User.create!(
	first_name: 						"Wes",
	last_name: 							"Foster",
	email: 									"user@gmail.com",
	password: 							"abcd1234",
	sign_in_count: 					0,
	confirmed_at: 					Date.yesterday
)

business = Business.create!(
	user_id:   				user.id,
	name:      				"My business",
	published: 				true,
	primary_color: 		'ffffff',
	secondary_color: 	'000000',
	website: 					'http://getthatyummycoffee.com',
	facebook: 				'fbyummy',
	twitter: 					'GetCoffee'
)

greeting = Greeting.create(
	welcome_message: 			"Welcome!",
	welcome_reward: 			100,
	welcome_reward_freq: 	0, #Daily
	exit_message: 				"Goodbye!",
	exit_campaign_id:			1,
	exit_freq_days:				3,
	exit_freq_type:				0 # 0=Days
)

location = Location.create!(
	business_id: 	business.id,
	greeting_id: 	greeting.id,
	title: 				"My location",
	address: 			"100 S Hampton Pl",
	address2: 		"",
	city: 				"Clarksville",
	state: 				"TN",
	zipcode: 			"37040",
	latitude: 		36.5896212,
	longitude: 		-87.2933637
)

beacon = Beacon.create!(
	location_id: 	location.id,
	uuid: 				"1234567890",
	void: 				false
)

customer = Customer.create!(
	first_name: 	"Jack",
	last_name: 		"Johnson",
	email: 				"customer@gmail.com",
	active: 			false
)