class UsersController < ApplicationController
    before_action :find_user, only: [ :show, :update, :destroy ]

    def index
        @users = User.all
    end

    def show; end

    def create
        @user = User.new(user_params)
        if @user.save
            render :create, status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def update
        if @user.update(user_params)
            @user
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @user.destroy
    end

    private

    def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def find_user
        @user = User.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        render json: { error: "User not found" }, status: :not_found
    end
end
