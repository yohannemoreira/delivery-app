json.order do |order|
  json.id order.id
  json.user_id order.user_id
  json.total_amount order.total_amount
  json.status order.status
  json.created_at order.created_at
  json.updated_at order.updated_at
  json.status "deleted"
  json.message "Order deleted successfully"
end
