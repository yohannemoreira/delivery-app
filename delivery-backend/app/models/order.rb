# == Schema Information
#
# Table name: orders
#
#  id                            :integer          not null, primary key
#  pickup_address_street         :string
#  pickup_address_number         :string
#  pickup_address_complement     :string
#  pickup_address_neighborhood   :string
#  pickup_address_city           :string
#  pickup_address_state          :string
#  pickup_address_zip            :string
#  pickup_address_country        :string
#  delivery_address_street       :string
#  delivery_address_number       :string
#  delivery_address_complement   :string
#  delivery_address_neighborhood :string
#  delivery_address_city         :string
#  delivery_address_state        :string
#  delivery_address_zip          :string
#  delivery_address_country      :string
#  description                   :string
#  estimated_value               :decimal(, )
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  user_id                       :integer          not null
#
# Indexes
#
#  index_orders_on_user_id  (user_id)
#

class Order < ApplicationRecord
  belongs_to :user

  validates :user_id, presence: { message: "Usuário não pode ser vazio" }

  validates :pickup_address_street, presence: { message: "A rua de retirada não pode ser vazia" }
  validates :pickup_address_number, presence: { message: "O número de retirada não pode ser vazio" }
  validates :pickup_address_neighborhood, presence: { message: "O bairro de retirada não pode ser vazio" }
  validates :pickup_address_city, presence: { message: "A cidade de retirada não pode ser vazia" }
  validates :pickup_address_state, presence: { message: "O estado de retirada não pode ser vazio" }, length: { is: 2, message: "O estado deve ter 2 caracteres" }
  validates :pickup_address_zip, presence: { message: "O CEP de retirada não pode ser vazio" }
  validates :pickup_address_country, presence: { message: "O país de retirada não pode ser vazio" }

  validates :delivery_address_street, presence: { message: "A rua de entrega não pode ser vazia" }
  validates :delivery_address_number, presence: { message: "O número de entrega não pode ser vazio" }
  validates :delivery_address_neighborhood, presence: { message: "O bairro de entrega não pode ser vazio" }
  validates :delivery_address_city, presence: { message: "A cidade de entrega não pode ser vazia" }
  validates :delivery_address_state, presence: { message: "O estado de entrega não pode ser vazio" }, length: { is: 2, message: "O estado deve ter 2 caracteres" }
  validates :delivery_address_zip, presence: { message: "O CEP de entrega não pode ser vazio" }
  validates :delivery_address_country, presence: { message: "O país de entrega não pode ser vazio" }

  validates :description, presence: { message: "A descrição não pode ser vazia" }
  validates :estimated_value, presence: { message: "O valor estimado não pode ser vazio" }, numericality: { greater_than: 0, message: "O valor estimado deve ser maior que 0" }
end
