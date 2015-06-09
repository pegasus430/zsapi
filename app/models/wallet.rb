class Wallet < ActiveRecord::Base
	belongs_to :business
	belongs_to :customer

	validates :points, numericality: { greater_than: 0 }
end