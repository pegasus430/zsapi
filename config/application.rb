require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Zippyspot
  class Application < Rails::Application
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
    config.stripe.secret_key        = "sk_test_S3gkDnv0bcJIMlr9XDrlzGZ3"
    config.stripe.publishable_key   = "pk_test_hpZmC08gcPoSGkB7fjanXYdw"

    # Custom
    config.x.API_SECRET_KEY             = "90f3a14f1a7025cb374e4d91cb007d2e"
    config.x.BEACON_COST                = 3999 #total cents
    config.x.BEACON_DESCRIPTION         = "A new beacon for you!"
    config.x.FACEBOOK_APP_ID            = "809663465807807"
    config.x.FACEBOOK_APP_SECRET        = "507d6f37d530c3393c55bc720339a336"
    config.x.MAILCHIMP_APP_ID           = "356985103618"
    config.x.MAILCHIMP_APP_SECRET       = "b2eef01b12b4c77c554a87c640ace2d0"
    config.x.CONSTANTCONTACT_APP_ID     = "tshw8qaqjjv5xpnfv5hcnb9d"
    config.x.CONSTANTCONTACT_APP_SECRET = "cH5WrjDafJu6F6VywJ5uYjXF"
    config.x.TWITTER_APP_ID             = "NkWazFulS6zSg3AsItfANDyUz"
    config.x.TWITTER_APP_SECRET         = "Xg26z4k6sk52vIxvLTIkRwgLhjqjrXXEvxdKpUFqD36Mhgg8Ct"

    #Koala
    Koala.config.api_version = "v2.0"
    
  end
end
