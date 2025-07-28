json.orders @orders do |order|
  json.id order.id
  json.user_id order.user_id
  json.pickup_address do
    json.street order.pickup_address_street
    json.number order.pickup_address_number
    json.complement order.pickup_address_complement
    json.neighborhood order.pickup_address_neighborhood
    json.city order.pickup_address_city
    json.state order.pickup_address_state
    json.zip order.pickup_address_zip
    json.country order.pickup_address_country
  end
  json.delivery_address do
    json.street order.delivery_address_street
    json.number order.delivery_address_number
    json.complement order.delivery_address_complement
    json.neighborhood order.delivery_address_neighborhood
    json.city order.delivery_address_city
    json.state order.delivery_address_state
    json.zip order.delivery_address_zip
    json.country order.delivery_address_country
  end
  json.description order.description
  json.estimated_value order.estimated_value
  json.created_at order.created_at.iso8601
  json.updated_at order.updated_at.iso8601
end
json.total_orders @orders.count
json.message "Orders retrieved successfully"
json.status "success"
