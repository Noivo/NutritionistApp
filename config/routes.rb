Rails.application.routes.draw do
  resources :components
  resources :foods
  root 'pages#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
