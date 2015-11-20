require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Zippyspot
  class Application < Rails::Application
    config.action_controller.action_on_unpermitted_parameters = :raise

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true

    # For TDD - WF
    config.generators do |g|
        g.test_framework :rspec,
            fixtures: true,
            view_specs: false,
            helper_specs: false,
            routing_specs: false,
            controller_specs: true,
            request_specs: true
        g.fixture_replacement :factory_girl, dir: "spec/factories"
    end

    # Stripe
    config.stripe.secret_key        = ENV['STRIPE_SECRET_KEY']
    config.stripe.publishable_key   = "pk_test_hpZmC08gcPoSGkB7fjanXYdw"

    # Custom
    config.x.API_SECRET_KEY             = ENV['API_SECRET_KEY']
    config.x.BEACON_COST                = ENV['BEACON_COST']
    config.x.BEACON_DESCRIPTION         = ENV['BEACON_DESCRIPTION']
    config.x.FACEBOOK_APP_ID            = ENV['FACEBOOK_APP_ID']
    config.x.FACEBOOK_APP_SECRET        = ENV['FACEBOOK_APP_SECRET']
    config.x.MAILCHIMP_APP_ID           = ENV['MAILCHIMP_APP_ID']
    config.x.MAILCHIMP_APP_SECRET       = ENV['MAILCHIMP_APP_SECRET']
    config.x.CONSTANTCONTACT_APP_ID     = ENV['CONSTANTCONTACT_APP_ID']
    config.x.CONSTANTCONTACT_APP_SECRET = ENV['CONSTANTCONTACT_APP_SECRET']
    config.x.TWITTER_APP_ID             = ENV['TWITTER_APP_ID']
    config.x.TWITTER_APP_SECRET         = ENV['TWITTER_APP_SECRET']

    #Koala
    Koala.config.api_version = "v2.0"

    #Browserify 
    config.browserify_rails.source_map_environments << "development"
    
  end
end
