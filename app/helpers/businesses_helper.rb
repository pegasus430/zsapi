module BusinessesHelper
	
	def connect_identity_link(provider)
		if current_user.send("#{provider}?")
			"Already Connected to #{provider}"
		else
			link_to "Connect to #{provider}", user_omniauth_upgrade_path( provider )
		end
	end

end