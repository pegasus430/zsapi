# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create!([
  {
    first_name:             "Business",
    last_name:              "Owner",
    email:                  "user@gmail.com",
    password:               "abcd1234",
    sign_in_count:          0,
    confirmed_at:           Date.yesterday
  }
])

businesses = Business.create!([
  {
    user_id:          users[0].id,
    name:             "My business",
    published:        true,
    primary_color:    'ffffff',
    secondary_color:  '000000',
    website:          'http://getthatyummycoffee.com',
    facebook:         'fbyummy',
    twitter:          'GetCoffee'
  }
])

greetings = Greeting.create([
  {
    welcome_message:      "Welcome!",
    welcome_reward:       100,
    welcome_reward_freq:  0, #Daily
    exit_message:         "Goodbye!",
    exit_campaign_id:     1,
    exit_freq_days:       3,
    exit_freq_type:       0 # 0=Days
  }
])

locations = Location.create!([
  {
    business_id:  businesses[0].id,
    greeting_id:  greetings[0].id,
    title:        "My location",
    address:      "100 S Hampton Pl",
    address2:     "",
    city:         "Clarksville",
    state:        "TN",
    zipcode:      "37040",
    latitude:     36.5896212,
    longitude:    -87.2933637
  },
  {
    business_id:  businesses[0].id,
    greeting_id:  greetings[0].id,
    title:        "My second location",
    address:      "110 S Hampton Pl",
    address2:     "",
    city:         "Clarksville",
    state:        "TN",
    zipcode:      "37040",
    latitude:     36.58997,
    longitude:    -87.29422369999999
  }
])

beacons = Beacon.create!([
  {
    location_id:  locations[0].id,
    uuid:         "1234567890",
    void:         false
  }
])

customers = Customer.create!([
  {
    first_name:   "Jack",
    last_name:    "Johnson",
    email:        "customer@gmail.com",
    active:       false
  },
  {
    first_name:   "James",
    last_name:    "Madison",
    email:        "sonimad@gmail.com",
    active:       false
  }
])