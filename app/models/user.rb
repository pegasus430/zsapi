class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable,
         :omniauthable, :omniauth_providers => [:facebook, :twitter, :instagram]

 	has_one :business
 	has_many :locations, through: :business
 	has_many :identities

 	validates_presence_of :email, :encrypted_password, :first_name, :last_name
 	validates_uniqueness_of :email

 	
 	def name
 		[first_name, last_name].join(' ')
 	end


 	def twitter
    identities.where(provider: "twitter").first
  end

  def twitter_client
    @twitter_client ||= Twitter.client( access_token: twitter.accesstoken )
  end

  def facebook
    identities.where(provider: "facebook").first
  end

  def facebook_client
    @facebook_client ||= Facebook.client( access_token: facebook.accesstoken )
  end

  def instagram
    identities.where(provider: "instagram").first
  end

  def instagram_client
    @instagram_client ||= Instagram.client( access_token: instagram.accesstoken )
  end

end