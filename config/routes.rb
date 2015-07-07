Rails.application.routes.draw do

  if Rails.env.development?
    concern :locationable do
      member do
        resources :locations, only: [:show]
      end
    end

    # Campaigns
    get '/campaigns/(:type)/(:status)', to: 'campaigns#index',  as: 'campaigns',    constraints: {status: /(all|featured|active|inactive|upcoming)/, type: /(all|coupon|reward|special)/}, defaults: {status: 'all', type: 'all'}
    get '/campaigns/new/:type',         to: 'campaigns#new',    as: 'new_campaign', constraints: {type: /(coupon|reward|special)/}, defaults: {type: 'coupon'}
    resources :campaigns, only: :show,  to: 'campaigns#show', concerns: :locationable
    resources :campaigns, except: [:index, :new, :show]
    
    # Customers
    get '/customers/:status/(:export)', to: 'customers#index',   as: 'customers',  constraints: {status: /(all|active|inactive)/}, defaults: {status: 'all'}

    # Beacons
    get   '/beacon/:key',     to: 'beacons#new',      as: 'new_beacon'
    post  '/beacon/:key',     to: 'beacons#create',   as: 'beacons'
    get   '/beacon/success',  to: 'beacons#success',  as: 'beacon_success'

    # Businesses
    get '/business', to: 'businesses#edit', as: 'edit_business'
    resources :businesses, only: [:new, :create, :update]

    # Receipts
    resources :receipts

    # Greetings
    resources :greetings

    # Locations
    resources :locations do
      get   '/payment/success', to: 'payments#success',   as: 'payment_success'
      get   '/payment/:id',     to: 'payments#show',      as: 'payment', constraints: { id: /[0-9]+/ }
      get   '/payment/new',     to: 'payments#new',       as: 'new_payment'
      post  '/payment/new',     to: 'payments#create',    as: 'payments'
      put   '/confirm',         to: 'locations#confirm',  as: 'confirm'

      # resources :greetings, only: [:show, :new, :create, :edit, :update]
    end

    # Users
    devise_for :users, controllers: {
      confirmations:  'users/confirmations',
      registrations:  'users/registrations',
      omniauth_callbacks: 'omniauth_callbacks'
    }

    devise_scope :user do
      get '/users/auth/:provider/upgrade' => 'omniauth_callbacks#upgrade', as: :user_omniauth_upgrade
      get '/users/auth/:provider/setup'   => 'omniauth_callbacks#setup'
    end

    # Admins
    devise_for :admins

    namespace :admin do
      root 'pages#dashboard'
      resources :receipts, only: [:index, :update, :destroy]
    end

    # Root
    root 'pages#dashboard'
  end


  ## API
  namespace :api do
    api versions: 1, module: "v1" do
      post '/customers/sign_in', to: 'customers#sign_in'
      post '/customers/sign_out', to: 'customers#sign_out'
      post '/customers/notification_token', to: 'customers#notification_token'
      get '/customers', to: 'customers#fetch'
      # get '/customers/feed', to: 'customers#feed'
      get '/locations/:id', to: 'locations#fetch'
      get '/locations/near/:lat|:lon', to: 'locations#fetch_nearby' # Fetch nearest 20 beacons. Similar to fetch map, but return top 20 by proximity
      get '/locations/map/:lat|:lon|:distance', to: 'locations#fetch_map'
      # get '/locations/:location_id/campaigns', to: 'campaigns#index'

      # post '/campaigns/:id/redeem', to: 'campaigns#redeem'

      post '/receipts', to: 'receipts#create'
    end
  end

end
