class UsersController < ApplicationController

	# This is ran via ajax when the sidebar icon is clicked
	def toggleSidebar
		if current_user.meta[:sidebar_collapsed].to_i == 0
			current_user.meta[:sidebar_collapsed] = 1
		else
			current_user.meta[:sidebar_collapsed] = 0
		end
		current_user.save

		render nothing: true
	end

end