Rails.application.routes.draw do

  scope '/customers', as: 'customers' do
    get '/',          to: 'customers#index'
    get '/active',    to: 'customers#index_active'
    get '/inactive',  to: 'customers#index_inactive'
  end

  # Confirm a beacon
  get   '/beacon/:key', to: 'beacons#new', as: 'new_beacon'
  post  '/beacon/:key', to: 'beacons#create'


  resources :businesses, only: [:new, :create, :edit, :update]
  resources :receipts

  resources :locations do
    get  '/payment/success',  to: 'payments#success', as: 'payment_success'
    get  '/payment/:id',      to: 'payments#show',    as: 'payment', constraints: { id: /[0-9]+/ }
    get  '/payment/new',      to: 'payments#new',     as: 'new_payment'
    post '/payment/new',      to: 'payments#create',  as: 'payments'
  end

  devise_for :users, controllers: {
    confirmations:  'users/confirmations',
    registrations:  'users/registrations'
  }
  devise_for :admins

  namespace :admin do
    root 'pages#dashboard'
    resources :receipts, only: [:index, :update, :destroy]
  end

  root 'pages#dashboard'
  

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
