# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_07_28_014348) do
  create_table "orders", force: :cascade do |t|
    t.string "pickup_address_street"
    t.string "pickup_address_number"
    t.string "pickup_address_complement"
    t.string "pickup_address_neighborhood"
    t.string "pickup_address_city"
    t.string "pickup_address_state"
    t.string "pickup_address_zip"
    t.string "pickup_address_country"
    t.string "delivery_address_street"
    t.string "delivery_address_number"
    t.string "delivery_address_complement"
    t.string "delivery_address_neighborhood"
    t.string "delivery_address_city"
    t.string "delivery_address_state"
    t.string "delivery_address_zip"
    t.string "delivery_address_country"
    t.string "description"
    t.decimal "estimated_value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "orders", "users"
end
