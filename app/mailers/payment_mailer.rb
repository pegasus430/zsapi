class PaymentMailer < ApplicationMailer

	def beacon_creation_email(payment)
	  @key = payment.key
	  @location = payment.location
	  @business = @location.business
	  @url = new_beacon_url(key: @key) # <- this is a route method!
	  mail(to: 'wesfed@gmail.com', subject: 'New iBeacon Order')
	end

	def beacon_shipped_email(payment)
	  @key = payment.key
	  @location = payment.location
	  @business = @location.business
	  @user = @location.user
	  mail(to: @user.email, subject: 'Your iBeacon has been shipped!')
	end

end
