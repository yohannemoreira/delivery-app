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

require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is valid with valid attributes' do
    user = User.new(name: 'Maria', email: 'maria@example.com', password: 'password123')
    expect(user).to be_valid
  end

  it 'is not valid without a name' do
    user = User.new(name: nil, email: 'maria@example.com', password: 'password123')
    expect(user).to be_invalid
  end

  it 'is not valid without a email' do
    user = User.new(name: 'Maria', email: nil, password: 'password123')
    expect(user).to be_invalid
  end

  it 'is not valid without a password' do
    user = User.new(name: 'Maria', email: 'maria@example.com', password: nil)
    expect(user).to be_invalid
  end

  it 'is not valid with a short password' do
    user = User.new(name: 'Maria', email: 'maria@example.com', password: 'short')
    expect(user).to be_invalid
  end

  it 'is not valid with a duplicate email' do
    User.create(name: 'John', email: 'john@example.com', password: 'password123')
    user = User.new(name: 'Maria', email: 'john@example.com', password: 'password123')
    expect(user).to be_invalid
  end
end
