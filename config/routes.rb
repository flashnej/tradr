Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/search', to: 'static_pages#index'
  get '/trade', to: 'static_pages#index'
  get '/follow', to: 'static_pages#index'
  get '/home', to: 'static_pages#index'
  get '/gameover', to: 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :search_stocks, only: [:show]
      resources :follows, only: [:index, :create, :destroy]
      resources :trades, only: [:index, :create, :update]
    end
  end
end
