Rails.application.routes.draw do
  resources :users
  resources :videos
  resources :comments
  get '/videos/:id/comments', to: 'videos#comments'
  post '/sessions/', to: 'sessions#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
