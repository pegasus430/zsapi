class PagesController < ApplicationController

	def subscription_canceled		
	end

	def locked_business		
	end
  
  def dashboard
  	@todays_campaigns = current_user.business.campaigns.valid_for(Date.today)

  	# Stats
		stat_query      = current_user.business.locations
		today_range     = Date.today.beginning_of_day..Date.today.end_of_day
		yesterday_range = Date.yesterday.beginning_of_day..Date.yesterday.end_of_day

  	@stats = {
			active_campaigns: 	@todays_campaigns.size,

  		today: {
				checkins: 		Stat.total_checkins(query: stat_query, range: today_range),
				redemptions: 	Stat.total_redemptions(query: stat_query, range: today_range)
			},
			yesterday: {
				checkins: 		Stat.total_checkins(query: stat_query, range: yesterday_range),
				redemptions: 	Stat.total_redemptions(query: stat_query, range: yesterday_range)
			}
  	}


  	render 'blank_dashboard' if @todays_campaigns.empty? && current_user.business.unpublished?
  end

end
