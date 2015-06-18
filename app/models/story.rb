class Story < ActiveRecord::Base
  validates  :body, :city_id, presence: true
  belongs_to :user
  belongs_to :city
  belongs_to :place


  validates :title,
  					:presence => true,
  					:length => { :minimum => 1, :maximum => 200}

  validates :body,
  					:presence => true,
  					:length => { :minimum => 1, :maximum => 2000 }



end
