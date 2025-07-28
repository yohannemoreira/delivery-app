json.user do |user|
  json.id @user.id
  json.name @user.name
  json.email @user.email
  json.created_at @user.created_at
  json.updated_at @user.updated_at
end
  json.status "updated" if @user.persisted?
  json.message "User updated successfully" if @user.persisted?
