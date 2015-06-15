class UsersController < ApplicationController
  def index
    @user = User.all
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.create(user_params)
    redirect_to user_path(@user)
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
    set_user
    @user = User.find(params[:id])
  end

  def update
    # @use
  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :pasword_confirmation)
  end

  def set_user
    @user = current_user
  end

end
