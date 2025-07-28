json.user do |user|
  json.id @user.id
  json.name @user.name
  json.email @user.email
  json.status "deleted"
  json.message "User deleted successfully"
end
