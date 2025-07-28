require 'rails_helper'

RSpec.describe Order, type: :model do
    before(:each) do
      @user = User.create(name: 'Maria', email: 'maria@example.com', password: 'password123')
    end

    after(:each) do
      @user.destroy
    end
  it 'is valid with valid attributes' do
    order = Order.new(
      pickup_address_street: 'Main St',
      pickup_address_number: '123',
      pickup_address_complement: 'Apt 4B',
      pickup_address_neighborhood: 'Downtown',
      pickup_address_city: 'Metropolis',
      pickup_address_state: 'NY',
      pickup_address_zip: '10001',
      pickup_address_country: 'USA',
      delivery_address_street: 'Elm St',
      delivery_address_number: '456',
      delivery_address_complement: 'Suite 5A',
      delivery_address_neighborhood: 'Uptown',
      delivery_address_city: 'Metropolis',
      delivery_address_state: 'NY',
      delivery_address_zip: '10002',
      delivery_address_country: 'USA',
      description: 'Food delivery',
      estimated_value: 29.99,
      user_id: @user.id
    )
    expect(order).to be_valid
  end

  describe 'pickup address validations' do
    %i[
      pickup_address_street
      pickup_address_number
      pickup_address_neighborhood
      pickup_address_city
      pickup_address_state
      pickup_address_zip
      pickup_address_country
    ].each do |attr|
      it "is not valid when #{attr} is nil" do
        attrs = {
          pickup_address_street: 'Main St',
          pickup_address_number: '123',
          pickup_address_complement: 'Apt 4B',
          pickup_address_neighborhood: 'Downtown',
          pickup_address_city: 'Metropolis',
          pickup_address_state: 'NY',
          pickup_address_zip: '10001',
          pickup_address_country: 'USA',
          delivery_address_street: 'Elm St',
          delivery_address_number: '456',
          delivery_address_complement: 'Suite 5A',
          delivery_address_neighborhood: 'Uptown',
          delivery_address_city: 'Metropolis',
          delivery_address_state: 'NY',
          delivery_address_zip: '10002',
          delivery_address_country: 'USA',
          description: 'Food delivery',
          estimated_value: 29.99,
          user_id: @user.id
        }
        attrs[attr] = nil
        order = Order.new(attrs)
        expect(order).to be_invalid
        expect(order.errors[attr]).to be_present
      end
    end
  end

  describe 'delivery address validations' do
    %i[
      delivery_address_street
      delivery_address_number
      delivery_address_neighborhood
      delivery_address_city
      delivery_address_state
      delivery_address_zip
      delivery_address_country
    ].each do |attr|
      it "is not valid when #{attr} is nil" do
        attrs = {
          pickup_address_street: 'Main St',
          pickup_address_number: '123',
          pickup_address_complement: 'Apt 4B',
          pickup_address_neighborhood: 'Downtown',
          pickup_address_city: 'Metropolis',
          pickup_address_state: 'NY',
          pickup_address_zip: '10001',
          pickup_address_country: 'USA',
          delivery_address_street: 'Elm St',
          delivery_address_number: '456',
          delivery_address_complement: 'Suite 5A',
          delivery_address_neighborhood: 'Uptown',
          delivery_address_city: 'Metropolis',
          delivery_address_state: 'NY',
          delivery_address_zip: '10002',
          delivery_address_country: 'USA',
          description: 'Food delivery',
          estimated_value: 29.99,
          user_id: @user.id
        }
        attrs[attr] = nil
        order = Order.new(attrs)
        expect(order).to be_invalid
        expect(order.errors[attr]).to be_present
      end
    end
  end
end
