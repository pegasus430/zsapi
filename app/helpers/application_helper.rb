module ApplicationHelper
	def yesno(boolean)
		raw boolean ? 'Y' : 'N'
	end

	def form_errors_for(object)
		render 'shared/form_errors', object: object
	end
end
