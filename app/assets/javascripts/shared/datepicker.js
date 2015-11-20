//= require datepicker/bootstrap-datepicker

// DATE PICKER!

// Preview on frontend at campaigns/21/edit
// consider using a different date picker

if ($('.input-group.date').length) {
  $('.input-group.date').datepicker({
    autoclose: true,
    orientation: 'top',
    todayHighlight: true,
    format: "mm/dd/yyyy"
  });
}