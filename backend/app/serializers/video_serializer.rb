class VideoSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :url, :handle, :user_id, :created_at
  belongs_to :user
  has_many :comments, serializer: :comment
end
