Rails.application.routes.draw do
  resources :meals do
    resources :components
  end
  resources :foods
  root 'pages#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
