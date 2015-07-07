module ApplicationHelper
	def yesno(boolean)
		raw boolean ? 'Y' : 'N'
	end
end
