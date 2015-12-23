//= require shared/cropbox_setup
//= require shared/datepicker



//= require s-campaigns


var customDaySelector = function() {


  // Show custom days selector

  var customDaySelector = $('.customDaySelector');

  $('.daysOfTheMonth input:radio').on('click', function() {
  
    if ($('.customDays').find('input').is(':checked')) {
      customDaySelector.addClass('active');
    } else {
      customDaySelector.removeClass('active');
    }

  });



  // Days Picker

  if ($('.customDaySelector').length) {
    
    $('.customDaySelector').datepicker({
      startDate: '05/01/2016',
      endDate: '05/31/2016',
      multidate: true,
      multidateSeparator: ',',
      calendarWeeks: true,
      todayHighlight: true
    });
    
    $('.customDaySelector').on('changeDate', function(event) {
      var aux, dates, day, i;
      dates = [];
      day = [];
      aux = '';
      dates = $('.customDaySelector').datepicker('getFormattedDate').split(',');
      i = dates.length - 1;
      while (i >= 0) {
        day = dates[i].split('/');
        aux = aux + day[1] + ',';
        i--;
      }
      $('#customDaySelector_input').val(aux);
    })

  }
}


customDaySelector()