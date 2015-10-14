Rails.application.routes.draw do

  apipie
  if Rails.env.development? || Rails.env.test?

    concern :datable do
      member do
        get 'dated/:start_date/(:end_date)', as: 'dated', constraints: {start_date: /\d{4}-\d{2}-\d{2}/, end_date: /\d{4}-\d{2}-\d{2}/}
      end
    end


    # Beacons
    get   '/beacon/:key',     to: 'beacons#edit',     as: 'edit_beacon'
    patch '/beacon/:key',     to: 'beacons#update'
    get   '/beacon/success',  to: 'beacons#success',  as: 'beacon_success'

    # Businesses
    get '/business', to: 'businesses#edit', as: 'edit_business'
    resources :businesses, only: [:new, :create, :update]

    # Customers
    get  '/customers/:status/(:export/:list)',  to: 'customers#index',   as: 'customers',  constraints: {status: /(all|active|inactive)/}, defaults: {status: 'all'}
    post '/customers/import',                   to: 'customers#import',  as: 'import_customers'

    # Greetings
    resources :greetings, except: [:show]


    # All Receipts
    resources :receipts, only: [:index, :show]

    # All Campaigns
    get '/campaigns/(:type)/(:status)', to: 'campaigns#index',  as: 'campaigns',    constraints: {status: /(all|featured|active|inactive|upcoming)/, type: /(all|coupon|reward|special)/}, defaults: {status: 'all', type: 'all'}
    get '/campaigns/new/:type',         to: 'campaigns#new',    as: 'new_campaign', constraints: {type: /(coupon|reward|special)/}, defaults: {type: 'coupon'}
    resources :campaigns, except: [:index, :new]

    # Locations and Locationable Routes
    resources :locations, except: [:destroy] do
      get     '/subscription/success',    to: 'subscriptions#success',   as: 'subscription_success'
      get     '/subscription',            to: 'subscriptions#show',      as: 'subscription'
      get     '/subscription/new',        to: 'subscriptions#new',       as: 'new_subscription'
      post    '/subscription/new',        to: 'subscriptions#create',    as: 'subscriptions'
      delete  '/subscription/cancel',     to: 'subscriptions#destroy',   as: 'cancel_subscription'
      patch '/confirm',   to: 'locations#confirm', as: 'confirm'

      # Locationable routes
      get '/campaigns/(:type)/(:status)', to: 'campaigns#index',  as: 'campaigns',    constraints: {status: /(all|featured|active|inactive|upcoming)/, type: /(all|coupon|reward|special)/}, defaults: {status: 'all', type: 'all'}
      resources :campaigns, only: :show
      resources :receipts, only: :index, concerns: :datable, action: :index
    end


    # Users
    devise_for :users, skip: [:sessions], controllers: {
      confirmations:  'users/confirmations',
      registrations:  'users/registrations',
      omniauth_callbacks: 'omniauth_callbacks'
    }

    devise_scope :user do
      get '/users/login'     => 'devise/sessions#new',     as: :new_user_session
      post '/users/login'    => 'devise/sessions#create',  as: :user_session
      delete '/users/logout' => 'devise/sessions#destroy', as: :destroy_user_session

      get '/users/auth/:provider/upgrade' => 'omniauth_callbacks#upgrade', as: :user_omniauth_upgrade
      get '/users/auth/:provider/setup'   => 'omniauth_callbacks#setup'
    end

    get '/users/toggleSidebar', to: "users#toggleSidebar"

    # Admins
    devise_for :admins

    namespace :admin do
      root 'pages#dashboard'
      resources :receipts, only: [:index, :update, :destroy]
    end

    # Normal Pages
    get '/lock_business/:id',   to: 'businesses#lock'
    get '/locked',   to: 'pages#locked_business',  as: 'locked_business'
    get '/subscription_canceled',   to: 'pages#subscription_canceled',  as: 'subscription_canceled'


    # Root
    root 'pages#dashboard'
  end


  ## API
  namespace :api do
    api versions: 1, module: "v1" do
      # Customer actions
      post '/customers/sign_in',            to: 'customers#sign_in'
      post '/customers/sign_out',           to: 'customers#sign_out'
      post '/customers/check_in',           to: 'customers#check_in'
      post '/customers/check_out',          to: 'customers#check_out'
      post '/customers/notification_token', to: 'customers#notification_token'
      get '/customers/profile',             to: 'customers#show'
      get '/customers/feed',                to: 'customers#feed'

      # Finds a location via UUID
      get '/beacons/:uuid/location',            to: 'locations#show'

      # Locations
      get '/locations/:id',                     to: 'locations#show'
      get '/locations/:id/campaigns',           to: 'campaigns#index'
      # Fetch nearest 20 beacons. Similar to fetch map, but return top 20 by proximity
      get '/locations/near/:lat/:lon',          to: 'locations#fetch_nearby', constraints: {lat: /\-?\d+(.\d+)?/, lon: /\-?\d+(.\d+)?/}
      get '/locations/map/:lat/:lon/:distance', to: 'locations#fetch_map', constraints: {lat: /\-?\d+(.\d+)?/, lon: /\-?\d+(.\d+)?/}

      # Campaigns
      resources :campaigns, only: [:show]

      # Receipts
      post '/receipts',           to: 'receipts#create'
      get  '/receipts/:status',   to: 'receipts#index', defaults: {status: 'untouched'}

      # Redemptions
      resources :redemptions, only: [:index, :create]

      # Referrals
      resources :share_links, only: [:show, :create]
    end
  end

end
