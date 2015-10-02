class Stat < ActiveRecord::Base
	attr_accessor :query
	attr_accessor :range

	def initialize(query, range)
		query = opts[:query]
		range = opts[:range]
	end

	def total_checkins(opts)
		query  = opts[:query]
		range  = opts[:range]

		Visit.all.where(location: query, last_visit_at: range).size
	end

	def total_redemptions(opts)
		query  = opts[:query]
		range  = opts[:range]
		type   = opts[:type]
		type ||= 'all'

		Redemption.send(type).where(location: query, created_at: range).size
	end

	def new_customers(opts)
		query  = opts[:query]
		range  = opts[:range]

		Visit.includes(:customer).where(location: query, last_visit_at: range, customers: {created_at: range}).size
	end

	private

		def today
			Date.today.beginning_of_day..Date.today.end_of_day
		end

		def yesterday
			Date.yesterday.beginning_of_day..Date.yesterday.end_of_day
		end
end