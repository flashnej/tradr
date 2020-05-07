Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/search', to: 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :search_stocks, only: [:show]
      resources :follows, only: [:index, :create, :show, :destroy]
    end
  end
end
