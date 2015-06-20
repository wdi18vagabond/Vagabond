class AddPlaceIdToStories < ActiveRecord::Migration
  def change
  	add_column :stories, :place_id, :string
  end
end
