class City < ActiveRecord::Base
	has_many :stories

	validates :name, presence: true, uniqueness: true
	validates :continent, presence: true
end
