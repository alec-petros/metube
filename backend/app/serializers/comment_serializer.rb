class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :text, :user_id, :created_at
  belongs_to :user, serializer: :user
  belongs_to :video
end
