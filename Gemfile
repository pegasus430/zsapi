source 'https://rubygems.org'

ruby '2.2.1'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.0'
# Use postgresql as the database for Active Record
gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Wesfed++
  gem 'devise'                              # User accounts
  gem 'geocoder'                            # Location lat/lon
  gem 'paperclip',      '~> 4.2'            # Image uploads
  gem 'rails-erd',      group: :development # ERD Generator
  gem 'rails_12factor', group: :production  # 12 factor
  gem 'rocket_pants',   '~> 1.0'            # API versioning
  gem 'smarter_csv'                         # Simple CSV importing
  gem 'stripe-rails'                        # Stripe integration
  gem 'week_of_month'                       # Week of month methods
  gem 'less-rails-bootstrap'                # Bootstrap LESS
  gem 'font-awesome-rails'                  # Font-awesome
  gem 'jcrop-rails-v2'                      # jCrop
  # gem 'bootstrap-sass'
  gem 'bourbon'

  # Identities++
    gem 'omniauth'

    gem 'omniauth-constantcontact2'
    gem 'constantcontact', '~> 2.1.0'
    
    gem 'omniauth-facebook'
    gem 'koala', '~> 2.0'
    
    gem 'omniauth-mailchimp'
    gem 'gibbon'
    
    gem 'omniauth-twitter'
    gem 'twitter'
  # Identities--
# Wesfed--


group :development, :test do
	gem 'rspec-rails'
	gem 'factory_girl_rails'

  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  # Allows for quick-testing matchers, such as for associations
  gem 'shoulda-matchers'
end


group :test do
	gem 'faker'
	gem 'capybara'
	gem 'database_cleaner'	# Cleans the DB prior to tests
	gem 'guard-rspec'
	gem 'launchy'			# Launches browser on failed integration spec
end