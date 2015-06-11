class Order < ActiveRecord::Base
  belongs_to :location
  belongs_to :beacon

  validates_presence_of :status

  before_create :generate_random_key


  private

  	def generate_random_key
  		o = [('a'..'z'), ('A'..'Z')].map { |i| i.to_a }.flatten
			self[:key] = (0...50).map { o[rand(o.length)] }.join}
		end
end
