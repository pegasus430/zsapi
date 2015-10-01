#= require masonry/masonry.pkgd
# require menuTour

# HIGHCHART JS - AREA CHART
# (($) ->

# 	google.load("visualization", "1", {packages:["corechart"]})
#   google.setOnLoadCallback(drawAreaChart)
#   google.setOnLoadCallback(drawPieChart)

#   drawAreaChart = ->
#     data = google.visualization.arrayToDataTable([
#       ['','Redemptions','Coupons','Recorded Visits']
#       ['2000',10527,31000,10824]
#       ['2001',10475,29000,10577]
#       ['2002',10421,27000,10527]
#       ['2003',10358,25000,10475]
#       ['2004',10295,24000,10421]
#       ['2005',10104,23000,10358]
#     ])
#     options = 
#       animation:
#         startup: 'true'
#         duration: 400
#       hAxis: textPosition: 'none'
#       vAxis: minValue: 0
#       legend:
#         position: 'bottom'
#         maxLines: 3
#       height: 400
#       colors: [
#         '#4CD9B9'
#         '#FF0141'
#         '#4990E2'
#       ]
#       areaOpacity: 0.9
#       backgroundColor: '#f4f4f5'
#     chart = new (google.visualization.AreaChart)(document.getElementById('area-chart'))
#     chart.draw data, options
#     return


#   drawPieChart = ->
#     data = google.visualization.arrayToDataTable([
#       ['Source', 'Redemptions']
#       ['This Week', 10]
#       ['Yesterday', 55]
#       ['Today', 35]
#     ])
#     options = 
#       title: 'Redemptions'
#       pieHole: 0.4
#       backgroundColor: '#f4f4f5'
#       pieSliceTextStyle:
#         color: '#FFF'
#         fontSize: 15
#       legend:
#         position: 'bottom'
#         maxLines: 3
#       slices:
#         0: color: '#4CD9B9'
#         1: color: '#FF0141'
#         2: color: '#4990E2'
#       tooltip: text: 'percentage'
#     chart = new (google.visualization.PieChart)(document.getElementById('pie-chart'))
#     chart.draw data, options
#     return

# ) jQuery