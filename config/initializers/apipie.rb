Apipie.configure do |config|
  config.app_name                = "Zippyspot"
  config.api_base_url            = "/api/1"
  config.doc_base_url            = "/apipie"
  # where is your API defined?
  config.api_controllers_matcher = "#{Rails.root}/app/controllers/api/**/*.rb"
  # config.markup = Apipie::Markup::Markdown.new
  config.show_all_examples = true
end
