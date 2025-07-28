class ChangeUserIdTypeInOrders < ActiveRecord::Migration[8.0]
  def change
    remove_column :orders, :user_id
    add_reference :orders, :user, null: false, foreign_key: true
  end
end
