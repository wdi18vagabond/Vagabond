class Place < ActiveRecord::Base
	has_many :stories
	validates  :place_id, :name, presence: true
	
end
