class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :text, :user_id, :created_at


  attribute :username do |object|
    "#{object.user.username}"
  end

  belongs_to :user
  belongs_to :video
end
