class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable

 	validates_presence_of :email, :encrypted_password#, :first_name, :last_name
 	validates_uniqueness_of :email

 	has_one :business

 	
 	def name
 		[first_name, last_name].join(' ')
 	end

end
