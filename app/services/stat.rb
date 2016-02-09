class Stat < ActiveRecord::Base

	def self.total_checkins(opts)
		query  = opts[:query]
		range  = opts[:range]

		Visit.all.count(conditions: {location: query, last_visit_at: range}) rescue 0
	end

	def self.total_redemptions(opts)
		query  = opts[:query]
		range  = opts[:range]
		type   = opts[:type]
		type ||= 'all'

		Redemption.send(type).count(conditions: {location: query, created_at: range}) rescue 0
	end

	def self.new_customers(opts)
		query  = opts[:query]
		range  = opts[:range]

		Visit.includes(:customer).where(location: query, last_visit_at: range, customers: {created_at: range}).size rescue 0
	end

end