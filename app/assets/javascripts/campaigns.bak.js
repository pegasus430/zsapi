//= require cropper/cropper

jQuery(document).ready(function($){
	/* SHOW CUSTOM DAYS SELECTOR */
	$('.daysOfTheMonth .radio').click(function(e){
	    if($('.customDays').find('input').is(':checked')){
	        $('.customDaySelector').addClass('active');
	    }else{
	        $('.customDaySelector').removeClass('active');
	    }
	});


	// DATE PICKER!
	if ($('.input-group.date').length) {
	    $('.input-group.date').datepicker({
	        autoclose: true,
	        orientation: 'top',
	        todayHighlight: true
	    });
	}

	// DAYs PICKER
	if ($('.customDaySelector').length) {
	    $('.customDaySelector').datepicker({
	        startDate: "05/01/2016",
	        endDate: "05/31/2016",
	        multidate: true,
	        multidateSeparator: ",",
	        calendarWeeks: true,
	        todayHighlight: true
	    });
	    $('.customDaySelector').on("changeDate", function(event) {
	        var dates = new Array();
	        var day = new Array();
	        aux = "";
	        dates = $('.customDaySelector').datepicker('getFormattedDate').split(',');
	        for (var i = dates.length - 1; i >= 0; i--) {
	            day = dates[i].split('/');
	            aux = aux + day[1]+"," ;
	        };
	        $("#customDaySelector_input").val( aux );
	    });
	}


	// UPLOAD IMAGE ON THE GO!
	if ($('.upload-campaign-image, .upload-trigger').length) {
	    $('.upload-campaign-image').click(function() {
	        $(this).next('input[type="file"]').trigger('click');
	        return false;
	    });
	}

	//open Popup
	if ($('.open-crop-popup-link').length) {
	    $('.open-crop-popup-link').magnificPopup({
	      type:'inline',
	      midClick: true,
	      removalDelay: 500,
	      mainClass: 'mfp-fade',
	      callbacks: {
	        open: function() {
	            $('#crop-image-popup .container > img').cropper({
	              aspectRatio: 1 / 1,
	              checkImageOrigin: true,
	              responsive: true,
	              modal: true,
	              crop: function(data) {
	                //console.log(data);
	                // Output the result data for cropping image.
	              }
	            });
	            $('.crop-btn').click(function(e){
	                $('.imgPlaceHolder img').attr('src',$('#crop-image-popup .container > img').cropper('getCroppedCanvas').toDataURL("image/jpeg", 1.0));
	                $('.mfp-close').click();
	            });
	        },
	        close: function() {
	          // Will fire when popup is closed
	        }
	      }
	    });
	};
});


/// UPDATE IMAGES ON THE GO!
function handleFiles(fileInput) {
    var files = fileInput.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /image.*/;
 
        if (!file.type.match(imageType)) {
            continue;
        }
        // insert the img in the popup cropper
        var img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        $('#crop-image-popup .container').html(img);
        var reader = new FileReader();
        reader.onload = (function(aImg) { 
            return function(e) { 
                aImg.src = e.target.result; 
            }; 
        })(img);
        reader.readAsDataURL(file);

        // insert the img in the placeholder
        var img2 = document.createElement("img");
        img2.classList.add("obj");
        img2.file = file;

        $('.imgPlaceHolder').html(img2);
        var reader2 = new FileReader();
        reader2.onload = (function(aImg) { 
            return function(e) { 
                $('.campaignImage').attr('value', e.target.result);
                aImg.src = e.target.result; 
                /* SHOW PLACEHOLDER AND CROP BUTTON ON MOBILE AFTER UPDATE */
                $('.tempHideOnMobile').show();
            }; 
        })(img2);
        reader2.readAsDataURL(file);
    }    
}
