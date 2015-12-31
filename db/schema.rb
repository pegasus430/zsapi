# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151228200649) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.boolean  "manage_receipts",        default: false
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.integer  "failed_attempts",        default: 0,     null: false
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "admins", ["email"], name: "index_admins_on_email", unique: true, using: :btree
  add_index "admins", ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true, using: :btree
  add_index "admins", ["unlock_token"], name: "index_admins_on_unlock_token", unique: true, using: :btree

  create_table "beacons", force: :cascade do |t|
    t.integer  "location_id"
    t.string   "uuid"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "status",       default: 0, null: false
    t.string   "creation_key"
  end

  add_index "beacons", ["location_id"], name: "index_beacons_on_location_id", using: :btree

  create_table "businesses", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name",                           null: false
    t.string   "primary_color"
    t.string   "secondary_color"
    t.string   "website"
    t.string   "facebook"
    t.string   "twitter"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "status",             default: 0, null: false
    t.string   "yelp_url"
    t.date     "trial_ends_at"
  end

  add_index "businesses", ["user_id"], name: "index_businesses_on_user_id", using: :btree

  create_table "campaigns", force: :cascade do |t|
    t.integer  "type_of",                            null: false
    t.string   "title",                              null: false
    t.decimal  "discount_amount",    default: 0.0,   null: false
    t.integer  "discount_type",      default: 0,     null: false
    t.integer  "referrer_reward"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.boolean  "featured",           default: false, null: false
    t.integer  "schedule_id"
    t.date     "start_at",                           null: false
    t.date     "end_at"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.integer  "status",             default: 0,     null: false
    t.string   "pos"
    t.string   "description"
    t.integer  "business_id"
    t.integer  "referral_reward",    default: 0
    t.integer  "reward_cost",        default: 0,     null: false
  end

  add_index "campaigns", ["business_id"], name: "index_campaigns_on_business_id", using: :btree
  add_index "campaigns", ["schedule_id"], name: "index_campaigns_on_schedule_id", using: :btree

  create_table "campaigns_locations", id: false, force: :cascade do |t|
    t.integer "location_id", null: false
    t.integer "campaign_id", null: false
  end

  create_table "customers", force: :cascade do |t|
    t.string   "first_name",                     null: false
    t.string   "last_name",                      null: false
    t.string   "email",                          null: false
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "social_type"
    t.string   "social_id"
    t.string   "social_token"
    t.string   "notification_token"
    t.text     "social_friends"
    t.integer  "status",             default: 0, null: false
    t.string   "avatar_url"
  end

  create_table "greetings", force: :cascade do |t|
    t.string   "welcome_message"
    t.integer  "welcome_reward"
    t.string   "exit_message"
    t.integer  "campaign_id"
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
    t.integer  "campaign_wait_time",          default: 0,      null: false
    t.integer  "welcome_wait_time",           default: 0,      null: false
    t.integer  "business_id"
    t.integer  "campaign_wait_time_quantity", default: 0
    t.string   "campaign_wait_time_span",     default: "days"
  end

  add_index "greetings", ["business_id"], name: "index_greetings_on_business_id", using: :btree
  add_index "greetings", ["campaign_id"], name: "index_greetings_on_campaign_id", using: :btree

  create_table "identities", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "customer_id"
    t.string   "provider",     null: false
    t.string   "access_token", null: false
    t.string   "other_token"
    t.datetime "expires_at"
    t.string   "uid",          null: false
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "identities", ["access_token"], name: "index_identities_on_access_token", using: :btree
  add_index "identities", ["customer_id"], name: "index_identities_on_customer_id", using: :btree
  add_index "identities", ["uid"], name: "index_identities_on_uid", using: :btree
  add_index "identities", ["user_id"], name: "index_identities_on_user_id", using: :btree

  create_table "location_photos", force: :cascade do |t|
    t.string   "name"
    t.integer  "location_id"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "location_photos", ["location_id"], name: "index_location_photos_on_location_id", using: :btree

  create_table "locations", force: :cascade do |t|
    t.integer  "business_id"
    t.string   "title",                     null: false
    t.string   "address",                   null: false
    t.string   "address2"
    t.string   "city",                      null: false
    t.string   "state",                     null: false
    t.string   "zipcode",                   null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.float    "latitude",    default: 0.0
    t.float    "longitude",   default: 0.0
    t.integer  "greeting_id"
    t.integer  "status",      default: 0,   null: false
  end

  add_index "locations", ["business_id"], name: "index_locations_on_business_id", using: :btree
  add_index "locations", ["greeting_id"], name: "index_locations_on_greeting_id", using: :btree
  add_index "locations", ["latitude"], name: "index_locations_on_latitude", using: :btree
  add_index "locations", ["longitude"], name: "index_locations_on_longitude", using: :btree

  create_table "memberships", force: :cascade do |t|
    t.integer  "business_id",                              null: false
    t.integer  "customer_id",                              null: false
    t.integer  "points",                   default: 0,     null: false
    t.datetime "last_visit_at"
    t.datetime "welcome_reward_valid_at"
    t.datetime "last_exit_at"
    t.integer  "campaign_id"
    t.datetime "exit_campaign_expires_at"
    t.boolean  "notified",                 default: false, null: false
  end

  add_index "memberships", ["business_id"], name: "index_memberships_on_business_id", using: :btree
  add_index "memberships", ["customer_id"], name: "index_memberships_on_customer_id", using: :btree

  create_table "receipts", force: :cascade do |t|
    t.date     "purchased_on"
    t.decimal  "amount",             precision: 8, scale: 2
    t.string   "reject_reason"
    t.datetime "created_at",                                             null: false
    t.datetime "updated_at",                                             null: false
    t.integer  "status",                                     default: 0, null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "redemption_id"
  end

  add_index "receipts", ["redemption_id"], name: "index_receipts_on_redemption_id", using: :btree

  create_table "redemptions", force: :cascade do |t|
    t.integer  "campaign_id"
    t.integer  "customer_id",             null: false
    t.integer  "location_id",             null: false
    t.datetime "created_at",              null: false
    t.integer  "status",      default: 0, null: false
  end

  add_index "redemptions", ["campaign_id"], name: "index_redemptions_on_campaign_id", using: :btree
  add_index "redemptions", ["customer_id"], name: "index_redemptions_on_customer_id", using: :btree
  add_index "redemptions", ["location_id"], name: "index_redemptions_on_location_id", using: :btree

  create_table "referrals", force: :cascade do |t|
    t.integer  "referrer_id",               null: false
    t.integer  "campaign_id",               null: false
    t.integer  "share_link_id",             null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "customer_id",               null: false
    t.integer  "status",        default: 0, null: false
  end

  add_index "referrals", ["campaign_id"], name: "index_referrals_on_campaign_id", using: :btree
  add_index "referrals", ["customer_id"], name: "index_referrals_on_customer_id", using: :btree
  add_index "referrals", ["referrer_id"], name: "index_referrals_on_referrer_id", using: :btree
  add_index "referrals", ["share_link_id"], name: "index_referrals_on_share_link_id", using: :btree

  create_table "schedules", force: :cascade do |t|
    t.string  "title",                        null: false
    t.integer "days_of_week",   default: [0],              array: true
    t.integer "weeks_of_month", default: [0],              array: true
    t.integer "day_numbers",    default: [0],              array: true
  end

  add_index "schedules", ["day_numbers"], name: "index_schedules_on_day_numbers", using: :gin
  add_index "schedules", ["days_of_week"], name: "index_schedules_on_days_of_week", using: :gin
  add_index "schedules", ["weeks_of_month"], name: "index_schedules_on_weeks_of_month", using: :gin

  create_table "share_links", force: :cascade do |t|
    t.integer  "campaign_id"
    t.integer  "customer_id"
    t.string   "code",        null: false
    t.datetime "created_at",  null: false
  end

  add_index "share_links", ["campaign_id"], name: "index_share_links_on_campaign_id", using: :btree
  add_index "share_links", ["code"], name: "index_share_links_on_code", using: :btree
  add_index "share_links", ["customer_id"], name: "index_share_links_on_customer_id", using: :btree

  create_table "subscriptions", force: :cascade do |t|
    t.string   "stripe_sub_id"
    t.string   "stripe_plan_id",              null: false
    t.datetime "next_billing_at"
    t.integer  "location_id",                 null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "status",          default: 0, null: false
  end

  add_index "subscriptions", ["location_id"], name: "index_subscriptions_on_location_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "stripe_id"
    t.text     "meta"
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "visits", force: :cascade do |t|
    t.integer  "customer_id",             null: false
    t.integer  "location_id",             null: false
    t.datetime "updated_at",              null: false
    t.integer  "total",       default: 0
  end

  add_index "visits", ["customer_id"], name: "index_visits_on_customer_id", using: :btree
  add_index "visits", ["location_id"], name: "index_visits_on_location_id", using: :btree

  add_foreign_key "campaigns", "businesses"
  add_foreign_key "campaigns", "schedules"
  add_foreign_key "greetings", "businesses"
  add_foreign_key "greetings", "campaigns"
  add_foreign_key "identities", "customers"
  add_foreign_key "identities", "users"
  add_foreign_key "location_photos", "locations"
  add_foreign_key "locations", "greetings"
  add_foreign_key "memberships", "businesses"
  add_foreign_key "memberships", "campaigns"
  add_foreign_key "memberships", "campaigns"
  add_foreign_key "memberships", "customers"
  add_foreign_key "receipts", "redemptions"
  add_foreign_key "redemptions", "campaigns"
  add_foreign_key "redemptions", "customers"
  add_foreign_key "redemptions", "locations"
  add_foreign_key "referrals", "campaigns"
  add_foreign_key "referrals", "customers"
  add_foreign_key "referrals", "customers", column: "referrer_id"
  add_foreign_key "referrals", "share_links"
  add_foreign_key "share_links", "campaigns"
  add_foreign_key "share_links", "customers"
  add_foreign_key "subscriptions", "locations"
  add_foreign_key "visits", "customers"
  add_foreign_key "visits", "locations"
end
