class Stat < ActiveRecord::Base

	def self.total_checkins(opts)
		query  = opts[:query]
		range  = opts[:range]

		Visit.all.where(location: query, last_visit_at: range).size
	end

	def self.total_redemptions(opts)
		query  = opts[:query]
		range  = opts[:range]
		type   = opts[:type]
		type ||= 'all'

		Redemption.send(type).where(location: query, created_at: range).size
	end

	def self.new_customers(opts)
		query  = opts[:query]
		range  = opts[:range]

		Visit.includes(:customer).where(location: query, last_visit_at: range, customers: {created_at: range}).size
	end

end