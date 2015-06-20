class PlacesController < ApplicationController

	def index
		# @places = Place.all
		# render :json @places
		render :index
	end

end
