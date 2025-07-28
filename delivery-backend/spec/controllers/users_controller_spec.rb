require 'rails_helper'

RSpec.describe "Users Controller", type: :request do
    let(:valid_attributes) { { user: { name: "Test User", email: "test@example.com", password: "password123", password_confirmation: "password123" } } }

    describe "GET /users" do
      before do
        get '/users', headers: { "ACCEPT" => "application/json" }
      end

      it "Return 200 OK" do
        expect(response).to have_http_status(:ok)
      end

      it "Return a list of users" do
        json_response = JSON.parse(response.body)
        expect(json_response['status']).to eq('success')
        expect(json_response['message']).to eq('Users retrieved successfully')
        expect(json_response['total_users']).to be >= 0
        expect(json_response['users']).to be_an(Array)
      end
    end

    describe "GET /users/:id" do
        let(:user) { User.create!(valid_attributes[:user]) }

        before do
            get "/users/#{user.id}", headers: { "ACCEPT" => "application/json" }
        end

        it "Return 200 OK" do
            expect(response).to have_http_status(:ok)
        end

        it "Return the user details" do
            json_response = JSON.parse(response.body, symbolize_names: true)

            expect(json_response.keys).to include(:id, :name, :email, :created_at, :updated_at)

            expect(json_response[:id]).to eq(user.id)
            expect(json_response[:name]).to eq(user.name)
            expect(json_response[:email]).to eq(user.email)
            expect(json_response[:created_at]).to be_present
            expect(json_response[:updated_at]).to be_present
        end

        it "Return 404 for non-existent user" do
            get "/users/999999", headers: { "ACCEPT" => "application/json" }
            expect(response).to have_http_status(:not_found)
            json_response = JSON.parse(response.body)
            expect(json_response['error']).to eq('User not found')
        end
    end

    describe "POST /users" do
        context "with valid attributes" do
            before do
            post '/users', params: valid_attributes, headers: { "ACCEPT" => "application/json" }
            end

            it "Return 201 Created" do
                expect(response).to have_http_status(:created)
            end

            it "Creates a new user" do
                json_response = JSON.parse(response.body, symbolize_names: true)
                expect(json_response[:id]).to be_present
                expect(json_response[:name]).to eq(valid_attributes[:user][:name])
                expect(json_response[:email]).to eq(valid_attributes[:user][:email])
                expect(json_response[:created_at]).to be_present
                expect(json_response[:updated_at]).to be_present
            end
        end
        context "with invalid attributes" do
            it "Returns blank fields error for name" do
                post '/users', params: { user: { name: "", email: "test@example.com", password: "password123", password_confirmation: "password123" } }, headers: { "ACCEPT" => "application/json" }

                json_response = JSON.parse(response.body)
                expect(response).to have_http_status(:unprocessable_entity)
                expect(json_response['name']).to include("can't be blank")
            end

            it "Returns blank fields error for email" do
            post '/users', params: { user: { name: "Test User", email: "", password: "password123", password_confirmation: "password123" } }, headers: { "ACCEPT" => "application/json" }

            json_response = JSON.parse(response.body)
            expect(response).to have_http_status(:unprocessable_entity)
            expect(json_response['email']).to include("can't be blank")
            end

            it "Returns blank fields error for password" do
                post '/users', params: { user: { name: "Test User", email: "test@example.com", password: "", password_confirmation: "password123" } }, headers: { "ACCEPT" => "application/json" }

                json_response = JSON.parse(response.body)
                expect(response).to have_http_status(:unprocessable_entity)
                expect(json_response['password']).to include("can't be blank")
            end

            it "Returns password too short error for password" do
            post '/users', params: { user: { name: "Test User", email: "", password: "short", password_confirmation: "short" } }, headers: { "ACCEPT" => "application/json" }

                json_response = JSON.parse(response.body)
                expect(response).to have_http_status(:unprocessable_entity)
                expect(json_response['password']).to include("is too short (minimum is 8 characters)")
            end

            it "Returns error for incorrect password confirmation" do
            post '/users', params: { user: { name: "Test User", email: "", password: "password123", password_confirmation: "password456" } }, headers: { "ACCEPT" => "application/json" }

                json_response = JSON.parse(response.body)
                expect(response).to have_http_status(:unprocessable_entity)
                expect(json_response['password_confirmation']).to include("doesn't match Password")
            end
        end
    end

    describe "PATCH /users/:id" do
      let(:user) { User.create!(valid_attributes[:user]) }

        context "with valid attributes for updating name" do
            before do
                patch "/users/#{user.id}", params: { user: { name: "Updated Name", email: user.email, password: valid_attributes[:user][:password], password_confirmation: valid_attributes[:user][:password_confirmation] } }, headers: { "ACCEPT" => "application/json" }
            end

            it "Return 200 OK" do
                expect(response).to have_http_status(:ok)
            end

            it "Updates the username" do
                json_response = JSON.parse(response.body, symbolize_names: true)
                expect(json_response[:name]).to eq("Updated Name")
            end
        end

        context "with valid attributes for updating email" do
            before do
                patch "/users/#{user.id}", params: { user: { name: user.name, email: "updated@example.com", password: valid_attributes[:user][:password], password_confirmation: valid_attributes[:user][:password_confirmation] } }, headers: { "ACCEPT" => "application/json" }
            end

            it "Return 200 OK" do
                expect(response).to have_http_status(:ok)
            end

            it "Updates the user's email" do
                json_response = JSON.parse(response.body, symbolize_names: true)
                expect(json_response[:email]).to eq("updated@example.com")
            end
        end

        context "with valid attributes for updating password" do
            before do
                patch "/users/#{user.id}", params: { user: { name: user.name, email: user.email, password: "newpassword123", password_confirmation: "newpassword123" } }, headers: { "ACCEPT" => "application/json" }
            end

            it "Return 200 OK" do
                expect(response).to have_http_status(:ok)
            end

            it "Updates the user's password" do
                json_response = JSON.parse(response.body, symbolize_names: true)
                expect(json_response[:id]).to eq(user.id)
                expect(json_response[:name]).to eq(user.name)
                expect(json_response[:email]).to eq(user.email)
            end
        end

        context "with invalid attributes for name" do
            before do
                patch "/users/#{user.id}", params: { user: { name: "", email: user.email, password: "newpassword123", password_confirmation: "newpassword123" } }, headers: { "ACCEPT" => "application/json" }
            end

            it "Return 422 Unprocessable Entity" do
                expect(response).to have_http_status(:unprocessable_entity)
            end
        end

         context "with invalid attributes for email" do
            before do
                patch "/users/#{user.id}", params: { user: { name: user.name, email: "", password: "newpassword123", password_confirmation: "newpassword123" } }, headers: { "ACCEPT" => "application/json" }
            end

            it "Return 422 Unprocessable Entity" do
                expect(response).to have_http_status(:unprocessable_entity)
            end
        end

        context "with invalid attributes for password" do
            before do
                patch "/users/#{user.id}", params: { user: { name: user.name, email: user.email, password: "", password_confirmation: "" } }, headers: { "ACCEPT" => "application/json" }
            end

            it "Return 422 Unprocessable Entity" do
                expect(response).to have_http_status(:unprocessable_entity)
            end
        end

        context "when user does not exist" do
            before do
                patch "/users/999999", params: { user: { name: "Updated Name" } }, headers: { "ACCEPT" => "application/json" }
            end

            it "Return 404 Not Found" do
                expect(response).to have_http_status(:not_found)
            end

            it "Returns user not found error" do
                json_response = JSON.parse(response.body)
                expect(json_response['error']).to eq('User not found')
            end
        end
    end
end
