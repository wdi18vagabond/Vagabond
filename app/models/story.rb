class Story < ActiveRecord::Base
  validate :title, :body, presence: true
  belongs_to :user
end
