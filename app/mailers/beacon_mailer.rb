class BeaconMailer < ApplicationMailer

	def created(beacon)
	  @key = beacon.creation_key
	  @location = beacon.location
	  @business = @location.business
	  mail(to: 'admin@zippyspot.com', subject: 'New iBeacon Order')
	end

	def shipped(beacon)
	  @location = beacon.location
	  @business = @location.business
	  @user = @location.user
	  mail(to: @user.email, subject: 'Your iBeacon has been shipped!')
	end

end
