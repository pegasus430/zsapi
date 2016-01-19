module BusinessesHelper
	
	def connect_identity_link(provider)
		if current_user.send("#{provider}").nil?
			link_to "Connect", user_omniauth_upgrade_path( provider ), class: "btn btn-default connect"
		else
			content_tag :div, raw("Connected<br>(" + current_user.send(provider).name + ")"), class: "btn connected"
		end
	end

end