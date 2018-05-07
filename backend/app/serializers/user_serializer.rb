class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :created_at
  has_many :comments
  has_many :videos
end
