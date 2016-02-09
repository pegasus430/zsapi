class PagesController < ApplicationController

	def subscription_canceled		
	end

	def locked_business		
	end
  
  def dashboard
  	@locations = current_user.business.locations rescue nil
  	@campaigns = current_user.business.campaigns rescue nil
  	@todays_campaigns = @campaigns.valid_for(Date.today).limit(4) rescue nil

  	# Stats
  	unless @campaigns.blank?
			stat_query      = @locations
			today_range     = Date.today.beginning_of_day..Date.today.end_of_day
			yesterday_range = Date.yesterday.beginning_of_day..Date.yesterday.end_of_day

	  	@stats = {
				active_campaigns: 	@todays_campaigns.size,

	  		today: {
					checkins: 			Stat.total_checkins(query: stat_query, range: today_range),
					redemptions: 		Stat.total_redemptions(query: stat_query, range: today_range),
					coupons:     		Stat.total_redemptions(type: 'coupons', query: stat_query, range: today_range),
					rewards:     		Stat.total_redemptions(type: 'rewards', query: stat_query, range: today_range),
					specials:   		Stat.total_redemptions(type: 'specials', query: stat_query, range: today_range),
					new_customers: 	Stat.new_customers(query: stat_query, range: today_range)
				},
				yesterday: {
					checkins: 		Stat.total_checkins(query: stat_query, range: yesterday_range),
					redemptions: 	Stat.total_redemptions(query: stat_query, range: yesterday_range)
				}
	  	}

	  	if @stats[:today][:checkins] > 0
	  		@stats[:today][:conversion] = (100 / @stats[:today][:checkins]) * @stats[:today][:redemptions]
	  	else
	  		@stats[:today][:conversion] = 0
	  	end


	  	# Charts
	  	chart_area_row_data = []
			7.days.ago.to_date.upto(Date.today) do |date|
				visits_on_date = Visit.where(location: @locations).where('last_visit_at >= ? AND last_visit_at <= ?', date.beginning_of_day, date.end_of_day)
				chart_area_row_data << {c: [
	  			date.to_s,
	  			visits_on_date.count,
	  			visits_on_date.where(total: 1).count,
	  			Redemption.where(location: @locations).where('created_at >= ? AND created_at <= ?', date.beginning_of_day, date.end_of_day).count
				]}
			end

	  	chart_area = GoogleVisualr::Interactive::AreaChart.new(
		  	GoogleVisualr::DataTable.new(
		  		cols: [
		  			{type: 'string', label: 'Date'},
		  			{type: 'number', label: 'Visits'},
		  			{type: 'number', label: 'New Visits'},
		  			{type: 'number', label: 'Redemptions'},
		  		],
		  		rows: chart_area_row_data
		  	),
		  	{
		  		title: 'Visitors (last 7 days)',
		  		height: 400,
		  		animation: {
		  		  startup: 'true',
		  		  easing: 'inAndOut',
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


		  chart_pie = GoogleVisualr::Interactive::PieChart.new(
		  	GoogleVisualr::DataTable.new(
		  		cols: [
		  			{type: 'string', label: 'Type'},
		  			{type: 'number', label: 'Value'},
		  		],
		  		rows: [
		  			{c: ['Coupon', [@stats[:today][:coupons], 0].max]},
		  			{c: ['Reward', [@stats[:today][:rewards], 0].max]},
		  			{c: ['Special', [@stats[:today][:specials], 0].max]}
		  		]
		  	),
		  	{
		  		title: 'Redemptions by Type (today)',
		  		height: 400,
		  		pieHole: 1,
		  		pieSliceTextStyle:{
		  			color: '#FFF',
		  		  fontSize: 15,
		  		},
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
		  		slices: [
		  		  {color: '#4CD9B9'},
		  		  {color: '#FF0141'},
		  		  {color: '#4990E2'}
		  		],
		  		areaOpacity: 0.9,
		  		backgroundColor: '#f4f4f5'
		  	}
		  )


		  ## Assign to view
	  	@chart = {
	  		area: chart_area,
	  		pie: chart_pie
	  	}
	  end

  	render 'blank_dashboard' if (@campaigns.blank? || @locations.blank?)
  end

end
