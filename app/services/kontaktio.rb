class Kontaktio
	require 'excon'

	attr_accessor :response

	def initialize(api_key)
		@api_key = api_key
	end

	def device(query="")
		get "/device?#{query}"
		response_to_json
	end

	def device_by_unique_id(unique_id)
		get "/device/#{unique_id}"
		response_to_json
	end

	def device_status(unique_id)
		get "/device/#{unique_id}/status"
		response_to_json
	end

	def beacon(query="")
		get "/beacon?#{query}"
		response_to_json
	end


	private

		attr_accessor :api_key

		def get(path="")
			send_curl("get", path)
		end

		def post(path="", post_vars={})
			send_curl("post", path, post_vars)
		end

		def send_curl(method, path="", post_vars={})
			url = "https://api.kontakt.io#{path}"
			
			headers = {
				'Content-Type' => "application/x-www-form-urlencoded",
				'Accept'       => "application/vnd.com.kontakt+json;version=5",
				'Api-Key'      => @api_key
			}

			connection = Excon.new(url)

			if method == "get"
				@response = connection.get(headers: headers)
			elsif method == "post"
				@response = connection.post(
					headers: headers,
					body: URI.encode_www_form(post_vars)
				)
			end

			@response
		end

		def response_to_json
			JSON.parse(@response.body)
		end

end
