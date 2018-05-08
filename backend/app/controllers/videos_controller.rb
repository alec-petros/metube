class VideosController < ApplicationController

  skip_before_action :authenticate!, only: [:index, :comments, :show]
  before_action :set_video, only: [:show, :update, :destroy, :comments]

  # GET /videos
  def index
    @videos = Video.all
    options = {}
    options[:include] = [:comments]
    data = @videos.map do |video|
      VideoSerializer.new(video, options).serializable_hash
    end
    render json: data
  end

  # GET /videos/1
  def show
    options = {}
    options[:include] = [:comments]
    render json: VideoSerializer.new(@video, options).serialized_json
  end

  # POST /videos
  def create
    @video = Video.new(video_params)
    options = {}
    options[:include] = [:comments]

    if @video.save
      render json: VideoSerializer.new(@video, options).serialized_json, status: :created, location: @video
    else
      render json: @video.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /videos/1
  def update
    if @video.update(video_params)
      render json: @video
    else
      render json: @video.errors, status: :unprocessable_entity
    end
  end

  # DELETE /videos/1
  def destroy
    @video.destroy
  end

  def comments
    # comment_obj = @video.comments.map do |comment|
    #   {
    #     text: comment.text,
    #     created_at: comment.created_at,
    #     username: comment.user.username
    #   }
    # end
    options = {}
    options[:include] = [:comments]
    render json: VideoSerializer.new(@video, options).serialized_json
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_video
      @video = Video.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def video_params
      params.require(:video).permit(:name, :description, :url, :handle, :user_id)
    end
end
