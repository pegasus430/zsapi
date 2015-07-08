class Wallet < ActiveRecord::Base
	belongs_to :business
	belongs_to :customer

	validates :points, numericality: { greater_than_or_equal_to: 0 }
end