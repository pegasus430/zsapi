source 'https://rubygems.org'
ruby '2.2.1'

gem 'rails', '4.2.0'
gem 'pg', '~> 0.18'
gem 'sass-rails', '~> 5.0', '>= 5.0.6'
gem 'autoprefixer-rails'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'therubyracer', platforms: :ruby
gem 'jquery-rails'
gem 'turbolinks'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'devise'                              # User accounts
gem 'geocoder'                            # Location lat/lon
gem 'paperclip',      '~> 4.2'            # Image uploads
gem 'aws-sdk', '< 2.0'                    # For S3 uploading
gem 'rails-erd',      group: :development # ERD Generator
gem 'rails_12factor', group: :production  # 12 factor
gem 'rocket_pants',   '~> 1.0'            # API versioning
gem 'smarter_csv'                         # Simple CSV importing
gem 'stripe-rails'                        # Stripe integration
gem 'stripe-ruby-mock', '~> 2.1.1', :require => 'stripe_mock'  # MOCK for Stripe
gem 'week_of_month'                       # Week of month methods
gem 'less-rails-bootstrap'                # Bootstrap LESS
gem 'font-awesome-rails'                  # Font-awesome
gem 'bourbon'
gem 'apipie-rails', github: 'Apipie/apipie-rails', ref: '928bd858fd14ec67eeb9483ba0d43b3be8339608'  # < Specific commit to fix "content_tag" issue
gem 'google_visualr', '>= 2.5'
gem 'groupdate'
gem 'excon'                               # Easy HTTP requests
gem 'rpush'                               # Rails notifications for android/ios
gem 'omniauth'
gem 'omniauth-constantcontact2'
gem 'constantcontact', '~> 2.1.0'
gem 'omniauth-facebook'
gem 'koala', '~> 2.0'
gem 'omniauth-mailchimp'
gem 'gibbon', git: 'git://github.com/amro/gibbon.git', branch: 'api_v2'
gem 'omniauth-twitter'
gem 'twitter'
gem 'puma'
# gem 'bullet', group: :development
gem 'faker'
gem 'factory_girl_rails'

group :development, :test do
  gem 'rspec-rails'
  gem 'shoulda-matchers'    # Allows for quick-testing matchers, such as for associations
  gem 'traceroute'
  gem 'byebug'
  gem 'web-console', '~> 2.0'
  gem 'spring'
  
  # For live-reloading 
  # gem "guard", ">= 2.2.2", :require => false
  # gem "guard-livereload",  :require => false
  # gem "rack-livereload"
  # gem "rb-fsevent",        :require => false
end

group :test do
	gem 'capybara'
	gem 'database_cleaner'	# Cleans the DB prior to tests
	gem 'guard-rspec'
	gem 'launchy'			      # Launches browser on failed integration spec
end