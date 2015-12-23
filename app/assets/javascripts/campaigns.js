//= require shared/cropbox_setup
//= require shared/datepicker



//= require s-campaigns



/* ----------------------------------------------------------------
Custom day selector helper functions
*/

var toggleCustomDayBox = function() {
  var customDaySelector = $('.customDaySelector')
  

  if ($('.customDays').find('input').is(':checked')) {
    customDaySelector.addClass('active');
  } else {
    customDaySelector.removeClass('active');
  }
}


var initializeCustomDaySelector = function() {
  var customDaySelector = $('.customDaySelector')
  customDaySelector.datepicker({
      startDate: '05/01/2016',
      endDate: '05/31/2016',
      multidate: true,
      multidateSeparator: ',',
      calendarWeeks: true,
      todayHighlight: true
    })
}

var setInitialSelection = function() {

  // Create an array of pre-selected dates

  var dates = []
  dates = $('#customDaySelector_input').val().split(',')


  // For each date, set it as active

  $.each( dates, function(index, value) {
    var date = value

    // The markup for this date selection box is coming
    // from a plugin and is pretty sparse...
    // This approach seems the cleanest given the constraints

    $('.customDaySelector td.day').filter(function () { 
        return $(this).text() === date
      }).addClass('active')

  })

}

var updateSelection = function() {
  // initialize vars
  var aux = ''
  var dates = []
  var day = []
  var i
  
  dates = $('.customDaySelector').datepicker('getFormattedDate').split(',')
  // console.log(dates)
  
  i = dates.length - 1

  while (i >= 0) {
    day = dates[i].split('/')
    aux = aux + day[1] + ','
    i--
  }

  $('#customDaySelector_input').val(aux)
}






/* ----------------------------------------------------------------
Core Custom day selector function 
*/

var customDaySelector = function() {
  var customDaySelector = $('.customDaySelector')

  // Check to see if custom is pre-selected, 
  // and toggle the day selector accordingly

  toggleCustomDayBox()

  // mark selected days as selected

  var preselectedValue = $('#customDaySelector_input').val()
  if ( !!preselectedValue ) {
    // This needs to happen after the 
    // datepicker plugin has added it's 
    // html to the dom... 
    // Since it's at the bottom of the page
    // in a default-closed div, it's safe to 
    // set this timout fairly high...
    window.setTimeout(function() {
      setInitialSelection()
    }, 4000)
  }



  // handle toggle of the day selector on selection of "custom"

  $('.daysOfTheMonth input:radio').on('click', function() {
  
    toggleCustomDayBox()

  });


  // Days Picker

  if (customDaySelector.length) {
    
    // Initialize it
    
    initializeCustomDaySelector()
    

    // Update it on change
    
    customDaySelector.on('changeDate', function(event) {
      
      updateSelection('notInitial')

    })

  }
}


customDaySelector()