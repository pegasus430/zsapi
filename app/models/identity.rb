class Identity < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :uid, :provider
  validates_uniqueness_of :uid, scope: :provider

  def self.find_for_oauth(auth)
  	auth_store_data = {
  		provider: 			auth.provider,
  		uid: 						auth.uid,
  		access_token: 	auth.credentials.token,
    	name: 					auth.info.name,
    	email: 					auth.info.email
  	}

  	if auth.provider == 'facebook'
    	auth_store_data['expires_at'] = auth.credentials.expires_at
    end

    if auth.provider == 'twitter'
    	# Twitter's secret token
  		auth_store_data['other_token'] = auth.credentials.secret
  	end

  	if auth.provider == 'mailchimp'
  		auth_store_data['name'] 			 		= auth.extra.metadata.accountname
  		auth_store_data['access_token'] 	= "#{auth.credentials.token}-#{auth.extra.metadata.dc}"
  		auth_store_data['other_token'] 		= auth.extra.metadata.api_endpoint
  	end

  	if auth.provider == 'constantcontact'
    	auth_store_data['expires_at'] = auth.credentials.expires_at
  	end

  	identity = find_by(provider: auth.provider, uid: auth.uid)
  	identity = create(auth_store_data) if identity.nil?
    identity
  end


  def page_token
  	other_token if provider == 'facebook'
  end

  def secret_token
  	other_token if provider == 'twitter'
  end

  def api_endpoint
  	other_token if provider == 'mailchimp'
  end
end
