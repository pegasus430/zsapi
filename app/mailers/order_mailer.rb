class OrderMailer < ApplicationMailer

	def beacon_creation_email(order)
	  @key = order.key
	  @business = order.location.business
	  @location = order.location
	  @url = @key
	  # @url = new_beacon_url
	  mail(to: 'wesfed@gmail.com', subject: 'New iBeacon Order')
	end

end
