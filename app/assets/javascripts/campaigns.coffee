#= require shared/cropbox_setup

# START JQUERY
(($) ->

  ###SHOW CUSTOM DAYS SELECTOR ###
  $('.daysOfTheMonth .radio').click (e) ->
    if $('.customDays').find('input').is(':checked')
      $('.customDaySelector').addClass 'active'
    else
      $('.customDaySelector').removeClass 'active'
    return


  # DATE PICKER!
  if $('.input-group.date').length
    $('.input-group.date').datepicker
      autoclose:      true
      orientation:    'top'
      todayHighlight: true


  # DAYs PICKER
  if $('.customDaySelector').length
    $('.customDaySelector').datepicker
      startDate:          '05/01/2016'
      endDate:            '05/31/2016'
      multidate:          true
      multidateSeparator: ','
      calendarWeeks:      true
      todayHighlight:     true

    $('.customDaySelector').on 'changeDate', (event) ->
      dates = new Array
      day = new Array
      aux = ''
      dates = $('.customDaySelector').datepicker('getFormattedDate').split(',')
      i = dates.length - 1
      while i >= 0
        day = dates[i].split('/')
        aux = aux + day[1] + ','
        i--
      $('#customDaySelector_input').val aux
      return
) jQuery