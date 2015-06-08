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
	user_id:   user.id,
	name:      "My business",
	published: true,
	primary_color: 'fff',
	secondary_color: '000',
	twitter: 'wer'
)

location = Location.create!(
	business_id: 	business.id,
	beacon_id: 		nil,
	title: 				"My location",
	address: 			"123 Street",
	address2: 		"",
	city: 				"Clarksville",
	state: 				"TN",
	zipcode: 			"37040"
)

receipts = Receipt.create!(
	location_id: location.id,
	image_filename: "receipt.jpg"
)