# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Admin.new({:email => "wes@wesfed.com", :password => "abcd1234", :password_confirmation => "abcd1234" }).save()

users = User.create!([
  {
    first_name:     "Business",
    last_name:      "Owner",
    email:          "user@gmail.com",
    password:       "abcd1234",
    sign_in_count:  0,
    confirmed_at:   Date.yesterday
  }
])

businesses = Business.create!([
  {
    user_id:          users[0].id,
    name:             "My business",
    status:           'published',
    primary_color:    'ffffff',
    secondary_color:  '000000',
    website:          'http://getthatyummycoffee.com',
    facebook:         'fbyummy',
    yelp_url:         'http://yelp.com/mypage',
    twitter:          'GetCoffee'
  }
])

greetings = Greeting.create([
  {
    business_id: businesses[0].id,
    welcome_message:       "Hey",
    welcome_reward:        100,
    welcome_wait_time:     'day',
    exit_message:          "Goodbye",
    campaign_wait_time:    3.days.to_i
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
    uuid:         "1234567890"
  }
])

customers = Customer.create!([
  {
    first_name:   "Jack",
    last_name:    "Johnson",
    email:        "customer@gmail.com",
  },
  {
    first_name:   "James",
    last_name:    "Madison",
    email:        "sonimad@gmail.com",
  }
])

schedule = Schedule.create!(title: "Every day")

campaigns = Campaign.create!([
  {
    schedule_id:      schedule.id,
    type_of:           'coupon',
    title:             "5% off",
    discount_amount:   5,
    discount_type:     'percent',
    share_reward:      100,
    status:            'active',
    start_at:          Date.yesterday,
    end_at:            nil,
    locations:         locations
  }
])