//= require datepicker/bootstrap-datepicker

// DATE PICKER!

// Preview on frontend at campaigns/21/edit
// consider using a different date picker

// This is put into a function so that it can be
// easily reloaded in ajax calls (admin receipt manager)


var $datePickerObject = $('.input-group.date')
var $specifiedFormat = $datePickerObject.data("format")



var initDatepicker = function(){
var theFormat

	if ( $specifiedFormat !== undefined || $specifiedFormat !== null ) {
		theFormat = $specifiedFormat
	}
	else {
		theFormat = "mm/dd/yyyy"
	}

  $datePickerObject.datepicker({
    autoclose: true,
    orientation: 'top',
    todayHighlight: true,
    format: theFormat
  })
}




if ( $datePickerObject !== undefined || $datePickerObject !== null ) {
	initDatepicker()
}