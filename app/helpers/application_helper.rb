module ApplicationHelper
	def yesno(boolean)
		raw boolean ? 'Y' : 'N'
	end

	def active_circle(boolean)
		active = boolean ? 'active' : 'disabled'
		raw "<span class=\"circle #{active}\"></span>"
	end

	def form_errors_for(object)
		render 'shared/form_errors', object: object
	end
end
