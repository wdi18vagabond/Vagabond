class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.confirm(user_params)

    if @user
      sign_in(@user)
      redirect_to user_path(@user)
    else
      redirect_to sign_in_path
    end

  end

  def destroy
    sign_out
    redirect_to sign_in_path
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end

end
