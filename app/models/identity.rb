class Identity < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :uid, :provider
  validates_uniqueness_of :uid, scope: :provider

  def self.find_for_oauth(auth)
  	byebug
  	auth_store_data = {
  		provider: 			auth.provider,
  		uid: 						auth.uid,
  		access_token: 	auth.credentials.token,
  		secret_token: 	auth.credentials.secret,
    	refresh_token: 	auth.credentials.refresh_token,
    	name: 					auth.info.name,
    	email: 					auth.info.email
  	}

  	identity = find_by(provider: auth.provider, uid: auth.uid)
  	identity = create(auth_store_data) if identity.nil?
    identity
  end
end
