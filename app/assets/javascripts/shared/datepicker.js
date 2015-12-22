//= require datepicker/bootstrap-datepicker

// DATE PICKER!

// Preview on frontend at campaigns/21/edit
// consider using a different date picker

// This is put into a function so that it can be
// easily reloaded in ajax calls (admin receipt manager)
initDatepicker = function(){
  $('.input-group.date').datepicker({
    autoclose: true,
    orientation: 'top',
    todayHighlight: true,
    format: "mm/dd/yyyy"
  });
}

if ($('.input-group.date').length) {
	initDatepicker();
}