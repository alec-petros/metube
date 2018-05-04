class User < ApplicationRecord
  has_many :videos
  has_many :comments
end
