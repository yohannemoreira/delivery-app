json.users @users do |user|
  json.id user.id
  json.name user.name
  json.email user.email
  json.created_at user.created_at
  json.updated_at user.updated_at
end
json.total_users @users.count
json.message "Users retrieved successfully"
json.status "success"
