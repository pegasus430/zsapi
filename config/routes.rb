Rails.application.routes.draw do

  scope '/customers', as: 'customers' do
    get '/',          to: 'customers#index'
    get '/active',    to: 'customers#index_active'
    get '/inactive',  to: 'customers#index_inactive'
  end

  # Confirm a beacon
  get   '/beacon/:key',     to: 'beacons#new',      as: 'new_beacon'
  post  '/beacon/:key',     to: 'beacons#create',   as: 'beacons'
  get   '/beacon/success',  to: 'beacons#success',  as: 'beacon_success'


  resources :businesses, only: [:new, :create, :edit, :update]
  resources :receipts

  resources :locations do
    get   '/payment/success', to: 'payments#success',   as: 'payment_success'
    get   '/payment/:id',     to: 'payments#show',      as: 'payment', constraints: { id: /[0-9]+/ }
    get   '/payment/new',     to: 'payments#new',       as: 'new_payment'
    post  '/payment/new',     to: 'payments#create',    as: 'payments'
    put   '/confirm',         to: 'locations#confirm',  as: 'confirm'
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


  ## API
  api versions: 1, module: "api/v1" do
    resources :users, only: [:index]
  end  

end
