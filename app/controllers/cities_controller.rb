class CitiesController < ApplicationController

	before_action :set_user

	def index
		@cities = City.all
		render :index
	end

	def new
	end

	def create
	end

	def show
		set_city
		render :show
	end

	def edit
	end

	def update
	end


	def destroy
	end

	private

	def set_user
	  @user = current_user
	end

	def set_city
	  @city = City.find(params[:id])
	end


end
