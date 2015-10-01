class PagesController < ApplicationController

	def subscription_canceled		
	end

	def locked_business		
	end
  
  def dashboard
  	@campaigns = current_user.business.campaigns.valid_for(Date.today)

  	# Stats
		stat_query      = current_user.business.locations
		today_range     = Date.today.beginning_of_day..Date.today.end_of_day
		yesterday_range = Date.yesterday.beginning_of_day..Date.yesterday.end_of_day

  	@stats = {
			active_campaigns: 	@campaigns.size,

  		today: {
				checkins: 		Stat.total_checkins(query: stat_query, range: today_range),
				redemptions: 	Stat.total_redemptions(query: stat_query, range: today_range)
			},
			yesterday: {
				checkins: 		Stat.total_checkins(query: stat_query, range: yesterday_range),
				redemptions: 	Stat.total_redemptions(query: stat_query, range: yesterday_range)
			}
  	}


  	# Charts
  	chart_area = GoogleVisualr::Interactive::AreaChart.new(
	  	GoogleVisualr::DataTable.new(
	  		cols: [
	  			{type: 'string', label: 'Date'},
	  			{type: 'number', label: 'Coupons'},
	  			{type: 'number', label: 'Rewards'},
	  			{type: 'number', label: 'Specials'}
	  		],
	  		rows: [
	  			{c: ['2004', 1000, 400, 11]},
	  			{c: ['2005', 1170, 460, 11]},
	  			{c: ['2006', 660, 1120, 11]},
	  			{c: ['2007', 1030, 540, 11]}
	  		]
	  	),
	  	{
	  		title: 'Campaign Redemptions by Type',
	  		height: 400,
	  		animation: {
	  		  startup: 'true',
	  		  duration: 400,
	  		},
	  		hAxis: {textPosition: 'none'},
	  		vAxis: {minValue: 0},
	  		legend: {
	  		  position: 'bottom',
	  		  maxLines: 3,
	  		},
	  		colors: [
	  		  '#4CD9B9',
	  		  '#FF0141',
	  		  '#4990E2'
	  		],
	  		areaOpacity: 0.9,
	  		backgroundColor: '#f4f4f5'
	  	}
	  )


	  ## Assign to view
  	@chart = {
  		area: chart_area,
  		# pie: chart_pie
  	}

  	render 'blank_dashboard' if @campaigns.empty? && current_user.business.unpublished?
  end

end
