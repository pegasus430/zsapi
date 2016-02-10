class SubscriptionMailer < ApplicationMailer

	def canceled(sub)
		@sub = sub
	  @location = sub.location
	  @business = @location.business
	  mail(to: 'admin@zippyspot.com', subject: 'Subscription has been canceled')
	end
end
