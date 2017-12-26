Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :admin do
    resources :products do 
      collection do
        get 'delete_product'
      end
    end
    resources :categories
  end

  resources :products do
  end

  resources :categories do
  	collection do
  		get 'get_sub_categories'
  		get 'get_main_categories'
      get 'get_all_categories'
  	end
  end

  get 'home/index' => 'home#welcome'

  root :to => 'home#welcome'
end
