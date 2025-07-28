class CreateOrders < ActiveRecord::Migration[8.0]
  def change
    create_table :orders do |t|
      t.string :user_id
      t.string :pickup_address_street
      t.string :pickup_address_number
      t.string :pickup_address_complement
      t.string :pickup_address_neighborhood
      t.string :pickup_address_city
      t.string :pickup_address_state
      t.string :pickup_address_zip
      t.string :pickup_address_country
      t.string :delivery_address_street
      t.string :delivery_address_number
      t.string :delivery_address_complement
      t.string :delivery_address_neighborhood
      t.string :delivery_address_city
      t.string :delivery_address_state
      t.string :delivery_address_zip
      t.string :delivery_address_country
      t.string :description
      t.decimal :estimated_value

      t.timestamps
    end
  end
end
