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

ActiveRecord::Schema.define(version: 20150607001114) do

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
    t.integer  "order_id"
    t.string   "uuid"
    t.boolean  "void",        default: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "beacons", ["location_id"], name: "index_beacons_on_location_id", using: :btree
  add_index "beacons", ["order_id"], name: "index_beacons_on_order_id", using: :btree

  create_table "businesses", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name",                            null: false
    t.boolean  "published",       default: false
    t.string   "logo_filename"
    t.string   "primary_color"
    t.string   "secondary_color"
    t.string   "website"
    t.string   "facebook"
    t.string   "twitter"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "businesses", ["user_id"], name: "index_businesses_on_user_id", using: :btree

  create_table "locations", force: :cascade do |t|
    t.integer  "business_id"
    t.integer  "beacon_id"
    t.string   "title",       null: false
    t.string   "address",     null: false
    t.string   "address2"
    t.string   "city",        null: false
    t.string   "state",       null: false
    t.string   "zipcode",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "locations", ["beacon_id"], name: "index_locations_on_beacon_id", using: :btree
  add_index "locations", ["business_id"], name: "index_locations_on_business_id", using: :btree

  create_table "orders", force: :cascade do |t|
    t.integer  "location_id"
    t.integer  "beacon_id"
    t.string   "buyer_ip",                   null: false
    t.datetime "purchase_date",              null: false
    t.string   "transaction_id",             null: false
    t.string   "key",                        null: false
    t.integer  "status",         default: 0
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "orders", ["beacon_id"], name: "index_orders_on_beacon_id", using: :btree
  add_index "orders", ["location_id"], name: "index_orders_on_location_id", using: :btree

  create_table "receipts", force: :cascade do |t|
    t.integer  "location_id"
    t.date     "purchased_on"
    t.decimal  "amount",         precision: 8, scale: 2
    t.string   "reject_reason"
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.string   "image_filename"
    t.integer  "status",                                 default: 0, null: false
    t.datetime "actioned_on"
  end

  add_index "receipts", ["location_id"], name: "index_receipts_on_location_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "first_name",                          null: false
    t.string   "last_name",                           null: false
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
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "businesses", "users"
  add_foreign_key "receipts", "locations"
end
