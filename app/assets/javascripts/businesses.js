// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/
//= require cropper/cropper
//= require minicolors/jquery.minicolors
//= require color-thief/color-thief


jQuery(document).ready(function($){

	// COLOR PICKER! 
	if ($('#colorPicker1').length) {
	    $('#colorPicker1').minicolors({
	        control: 'wheel',
	        position: 'right'
	    });
	}
	if ($('#colorPicker2').length) {
	    $('#colorPicker2').minicolors({
	        control: 'wheel',
	        position: 'right'
	    });
	}


	// UPLOAD IMAGE ON THE GO!
	if ($('.upload-campaign-image').length) {
	    $('.upload-campaign-image').click(function() {
	        $(this).next('input[type="file"]').trigger('click');
	        return false;
	    });
	}


	//open Popup
	if ($('.open-popup-link').length) {
	    $('.open-popup-link').magnificPopup({
	      type:'inline',
	      midClick: true,
	      removalDelay: 500,
	      mainClass: 'mfp-fade'
	    });
	};

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
})


// UPDATE IMAGES ON THE GO!
function handleFiles(fileInput)
{
  var files = fileInput.files;
  for (var i = 0; i < files.length; i++)
  {
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


// UPDATE BUSINESS LOGO ON THE GO!
function handleFilesLogo(fileInput) {
  var files = fileInput.files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /image.*/;
 
    if (!file.type.match(imageType)) {
      continue;
    }
    
    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;

    $('.imgPlaceHolder').html(img);

    var reader = new FileReader();
    reader.onload = (function(aImg) { 
      return function(e) { 
        $('.campaignImage').attr('value', e.target.result);
        aImg.src = e.target.result; 

        // color theif generating pallete
        var image = new Image();
        image.src = aImg.src;
        image.onload = (function(aImg) {
	        var colorThief = new ColorThief();
	        var colors = Array();
	        colors = colorThief.getPalette(image, 5);
	        $('.paleteColors').empty();
	        for (var i = colors.length - 1; i >= 0; i--) {
	          var hex = rgb2hex('rgb('+colors[i][0]+','+colors[i][1]+','+colors[i][2]+')');
	          $('.paleteColors').append('<div class="color" val="'+hex+'" style="background-color: rgb('+colors[i][0]+','+colors[i][1]+','+colors[i][2]+');"></div>');
	        };
	      });

        $('.paleteColors .color').click(function(){
          if($('.lastActive').length ) {
            $('.lastActive input').val( $(this).attr('val'));
            if ($('.lastActive #colorPicker1').length) {

              $('#colorPicker1').minicolors('value',$(this).attr('val'));
            };
            if ($('.lastActive #colorPicker2').length) {
              $('#colorPicker2').minicolors('value',$(this).attr('val'));
            };
          };
        });
      }; 
    })(img);

    reader.readAsDataURL(file);
  }  
}


/* TRANSFORM RGB TO HEX */
var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
function rgb2hex(rgb) {
 	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}


function updatePreview(){
  $('.previewHeader').css('background-color', $('#colorPicker1').val());
  $('.content, .socialFooter').css('background-color', $('#colorPicker2').val());
  $('.previewHeader img').attr('src', $('.logoImage').val());

  $('.content h1').html($('.businessName').val());
  var text = $('.address').val()+' '+$('.address2').val()+' '+$('.city').val()+' '+$('.state').val()+' '+$('.zipCode').val();
  $('.content p').html(text);  
}