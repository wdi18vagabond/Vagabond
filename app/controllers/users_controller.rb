class UsersController < ApplicationController

  def index
    set_user
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
      flash[:notice] = "Email already in use"
      redirect_to new_user_path
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
    @user.assign_attributes(user_params)
    if @user.save
      redirect_to user_path(@user)
    else
      flash[:notice] = "Email already in use"
      redirect_to edit_user_path
    end
    
  end

  def destroy
    set_user
    @user.destroy()
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :city, :email, :password, :pasword_confirmation)
  end

  def set_user
    @user = current_user
  end

end
