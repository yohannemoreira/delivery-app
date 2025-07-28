class OrdersController < ApplicationController
    before_action :find_order, only: [ :show, :update, :destroy ]

    def index
        @orders = Order.all
    end

    def show; end

    def create
        @order = Order.new(order_params)
        if @order.save
            render :show, status: :created
        else
            render json: @order.errors, status: :unprocessable_entity
        end
    end

    def update
        if @order.update(order_params)
            render :show, status: :ok
        else
            render json: @order.errors, status: :unprocessable_entity
        end
    end

    def destroy
        render :show, status: :ok
        @order.destroy
    end

    def user_orders
        user = User.find_by(id: params[:user_id])
        if user
            @orders = user.orders
            render :index
        else
            render json: { error: "User not found" }, status: :not_found
        end
    end

    private

    def order_params
        params.require(:order).permit(
            :user_id,
            :pickup_address_street,
            :pickup_address_number,
            :pickup_address_complement,
            :pickup_address_neighborhood,
            :pickup_address_city,
            :pickup_address_state,
            :pickup_address_zip,
            :pickup_address_country,
            :delivery_address_street,
            :delivery_address_number,
            :delivery_address_complement,
            :delivery_address_neighborhood,
            :delivery_address_city,
            :delivery_address_state,
            :delivery_address_zip,
            :delivery_address_country,
            :description,
            :estimated_value
        )
    end

    def find_order
        @order = Order.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        render json: { error: "Order not found" }, status: :not_found
    end
end
