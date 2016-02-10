Apipie.configure do |config|
  config.app_name                = "Zippyspot"
  config.api_base_url            = "/api/1"
  config.doc_base_url            = "/apidoc"
  # config.use_cache = Rails.env.production?
  # config.cache_dir = File.join(Rails.root, "doc", "apidoc")
  # where is your API defined?
  config.api_controllers_matcher = "#{Rails.root}/app/controllers/api/**/*.rb"
  # config.markup = Apipie::Markup::Markdown.new
  config.show_all_examples = true
  config.app_info["1.0"] = <<-EOS
  	== Authentication

		- <b>Base API URL:</b> http://zsdev.herokuapp.com/api/1
		- <b>API Secret Key:</b> 4s8d3e2z1s8w75ab374e4d91cb007d2e

		For all requests, you *must* pass an authorization *token*.

		Additionally, for all requests (except sign_in), you will need to pass the customer *id* and *social_token*.

		<b>Example using CURL:</b> curl -IH "Authorization: Token token=4reg64er6gre4grg65r4gr6e654g,id=5,social_token=12345" http://zsdev.herokuapp.com/api/1/customers/profile
  EOS
end
