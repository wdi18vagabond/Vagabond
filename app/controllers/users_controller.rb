class UsersController < ApplicationController
  def index
    @user = User.all
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      redirect_to user_path(@user)
    else
      redirect_to sign_in_path
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
    set_user
    @user = User.find(params[:id])
  end

  def update
    set_user
    @user.update_attributes(user_params)
    redirect_to user_path(@user)
  end

  def destroy
    set_user
    @user.destroy()
    redirect_to root_path
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :pasword_confirmation)
  end

  def set_user
    @user = current_user
  end

end
