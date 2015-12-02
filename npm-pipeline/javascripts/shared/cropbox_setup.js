//= require cropbox
//= require shared/files

(function($) {

  // START CROPBOX
  var cropbox_options = {
    thumbBox: '.thumbBox',
    spinner: '.spinner',
    imgSrc: $("#saved_image").attr('src')
  };

  
  $(".file_field").on('change', function() {
    var reader = new FileReader;
    reader.onload = function(e) {
      cropbox_options.imgSrc = e.target.result;
      window.cropper = $('#avatarBox').cropbox(cropbox_options);
      return $('#btnCrop, #btnZoomIn, #btnZoomOut').removeClass('disabled');
    };
    reader.readAsDataURL(this.files[0]);
    return this.files = [];
  });


  // Zoom Btns
  $('#btnZoomIn').on('click', function(){
    cropper.zoomIn()
  })
  $('#btnZoomOut').on('click', function(){
    cropper.zoomOut()
  })

  // Crop handler
  // Note - this was selected by a class of 
  //        the same name (as the id)... 
  $('#btnCrop').on('click', function() {

    var img = window.cropper.getDataURL();

    // Place the cropped image's datafile.
    return $('.cropped_image').html('<img src="' + img + '" width="420">');
  });



  // Crop handler
  $('#btnSaveClose').on('click', function() {

    var img = window.cropper.getDataURL();

    // Place the cropped image's datafile.
    $('.cropped_image').html('<img src="' + img + '" width="420">');

    // Place it to the default image. The one that triggers the modal.
    $('#saved_image').attr('src', img);

    // Place the datafile value in the hidden field
    $('#image_datafile').val(img);

    if ($('#refreshDetectedColors').is('*')) {
      return $('#refreshDetectedColors').trigger('click');
    }

  });


})(jQuery);