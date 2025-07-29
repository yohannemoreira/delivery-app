# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string
#  email           :string
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
    has_secure_password
    has_many :orders, dependent: :destroy

    validates :name, presence: { message: "O nome é obrigatório" }
    validates :email, presence: { message: "O e-mail é obrigatório" }, uniqueness: { message: "O e-mail já está em uso" }, format: { with: URI::MailTo::EMAIL_REGEXP, message: "O e-mail deve ser válido" }
    validates :password, presence: { message: "A senha é obrigatória" }, length: { minimum: 8, message: "A senha deve ter pelo menos 8 caracteres" }
end
