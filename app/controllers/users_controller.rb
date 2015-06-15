class UsersController < ApplicationController
  def index
    @user = User.all
  end

  def new
    @user = User.new
    render :new
  end

  def create
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
