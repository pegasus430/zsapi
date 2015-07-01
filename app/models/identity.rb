class Identity < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :uid, :provider
  validates_uniqueness_of :uid, scope: :provider

  def self.find_for_oauth(auth)
  	identity = find_by(provider: auth.provider, uid: auth.uid)
  	identity = create(uid: auth.uid, provider: auth.provider) if identity.nil?
  	identity.access_token = auth.credentials.token
    identity.refresh_token = auth.credentials.refresh_token
    identity.name = auth.info.name
    identity.email = auth.info.email
    identity.save
    identity
  end
end
