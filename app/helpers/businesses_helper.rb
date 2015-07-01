module BusinessesHelper
	
	def connect_identity_link(provider)
		if current_user.send("#{provider}").nil?
			link_to "Connect to #{provider}", user_omniauth_upgrade_path( provider )
		else
			"Already Connected to #{provider} (" + current_user.send(provider).name + ")"
		end
	end

end