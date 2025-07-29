require 'rails_helper'

RSpec.describe "Orders Controller", type: :request do
  let(:user) { User.create!(name: "Test User", email: "test@example.com", password: "password123") }
  let(:valid_attributes) do
    {
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
      user_id: user.id
    }
  end

  describe "GET /orders" do
    it "returns 200 OK" do
      get "/orders", headers: { "ACCEPT" => "application/json" }
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /orders/:id" do
    let(:order) { Order.create!(valid_attributes.merge(user_id: user.id)) }
    before do
      get "/orders/#{order.id}", headers: { "ACCEPT" => "application/json" }
    end

    it "returns 200 OK and the order id" do
      expect(response).to have_http_status(:ok)

      json_response = JSON.parse(response.body, symbolize_names: true)

      expect(json_response[:id]).to eq(order.id)
      expect(json_response[:user_id]).to eq(order.user_id)
    end

    it "returns 404 for non-existent order" do
      get "/orders/999999", headers: { "ACCEPT" => "application/json" }
      expect(response).to have_http_status(:not_found)
      json_response = JSON.parse(response.body)
      expect(json_response['error']).to eq('Order not found')
    end
  end

  describe "POST /orders" do
    it "creates an order" do
      expect {
        post "/orders", params: { order: valid_attributes }, headers: { "ACCEPT" => "application/json" }
      }.to change(Order, :count).by(1)
      expect(response).to have_http_status(:created)
    end

    it "returns 422 Unprocessable Entity for invalid attributes" do
      invalid_attributes = valid_attributes.merge(pickup_address_street: nil)
      post "/orders", params: { order: invalid_attributes }, headers: { "ACCEPT" => "application/json" }
      expect(response).to have_http_status(:unprocessable_entity)
      json_response = JSON.parse(response.body)
      expect(json_response['pickup_address_street']).to include("A rua de retirada não pode ser vazia")
    end
  end

  describe "PATCH /orders/:id" do
    it "updates the order" do
      order = Order.create!(valid_attributes)
      patch "/orders/#{order.id}", params: { order: { description: "New description" } }, headers: { "ACCEPT" => "application/json" }
      expect(response).to have_http_status(:ok)
      expect(order.reload.description).to eq("New description")
    end
    it "returns 404 for non-existent order" do
      patch "/orders/999999", params: { order: { description: "New description" } }, headers: { "ACCEPT" => "application/json" }
      expect(response).to have_http_status(:not_found)
      json_response = JSON.parse(response.body)
      expect(json_response['error']).to eq('Order not found')
    end

    it "returns 422 Unprocessable Entity for invalid attributes" do
      order = Order.create!(valid_attributes)
      patch "/orders/#{order.id}", params: { order: { pickup_address_street: nil } }, headers: { "ACCEPT" => "application/json" }
      expect(response).to have_http_status(:unprocessable_entity)
      json_response = JSON.parse(response.body)
      expect(json_response['pickup_address_street']).to include("A rua de retirada não pode ser vazia")
    end
  end

  describe "DELETE /orders/:id" do
    it "deletes the order" do
      order = Order.create!(valid_attributes)
      expect {
        delete "/orders/#{order.id}", headers: { "ACCEPT" => "application/json" }
      }.to change(Order, :count).by(-1)
      expect(response).to have_http_status(:ok)
    end

    it "returns 404 for non-existent order" do
      delete "/orders/999999", headers: { "ACCEPT" => "application/json" }
      expect(response).to have_http_status(:not_found)
      json_response = JSON.parse(response.body)
      expect(json_response['error']).to eq('Order not found')
    end
  end

  describe "GET /users/:user_id/orders" do
    let(:user) { User.create!(name: "Test User", email: "test@example.com", password: "password123") }
    before do
      Order.create!(valid_attributes.merge(user_id: user.id))
    end
    it "returns 200 OK and the user's orders" do
      get "/users/#{user.id}/orders", headers: { "ACCEPT" => "application/json" }
      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body, symbolize_names: true)
      expect(json_response[:message]).to eq('Orders retrieved successfully')
    end

    it "returns 404 for non-existent user" do
      get "/users/999999/orders", headers: { "ACCEPT" => "application/json" }
      expect(response).to have_http_status(:not_found)
      json_response = JSON.parse(response.body)
      expect(json_response['error']).to eq('User not found')
    end
  end
end
