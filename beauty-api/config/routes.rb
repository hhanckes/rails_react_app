Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
     	resources :ideas
		  resources :profiles do
        get 'service_category/:id' => :show_for_service_category, on: :collection
        get 'service/:id' => :show_for_service, on: :collection
      end
		  resources :services
		  resources :service_categories
      resources :service_details
    end
  end
end
