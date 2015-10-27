#= require datepicker/bootstrap-datepicker

# DATE PICKER!
if $('.input-group.date').length
  $('.input-group.date').datepicker
    autoclose:      true
    orientation:    'top'
    todayHighlight: true
    format: 				"mm/dd/yyyy"