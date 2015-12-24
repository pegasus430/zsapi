//= require cropbox
//= require shared/files





var handleSingleModal = function() {
  var scope_singleModal = $('#cropImageModal')

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
      window.cropper = $('.avatarBox', scope_singleModal).cropbox(cropbox_options);
      return $('.btnCrop, .btnZoomIn, .btnZoomOut', scope_singleModal).removeClass('disabled');
    };
    reader.readAsDataURL(this.files[0]);
    return this.files = [];
  });


  // Zoom Btns
  $('.btnZoomIn', scope_singleModal).on('click', function(){
    console.log('clicked!')
    cropper.zoomIn()
  })
  $('.btnZoomOut', scope_singleModal).on('click', function(){
    cropper.zoomOut()
  })

  // Crop handler
  // Note - this was selected by a class of 
  //        the same name (as the id)... 
  $('.btnCrop', scope_singleModal).on('click', function() {

    var img = window.cropper.getDataURL();

    // Place the cropped image's datafile.
    return $('.cropped_image', scope_singleModal).html('<img src="' + img + '" width="420">');
  });



  // Crop handler
  $('.btnSaveClose', scope_singleModal).on('click', function() {

    var img = window.cropper.getDataURL();

    // Place the cropped image's datafile.
    $('.cropped_image', scope_singleModal).html('<img src="' + img + '" width="420">');

    // Place it to the default image. The one that triggers the modal.
    $('#saved_image').attr('src', img);

    // Place the datafile value in the hidden field
    $('.image_datafile', scope_singleModal).val(img);

    if ($('#refreshDetectedColors').is('*')) {
      return $('#refreshDetectedColors').trigger('click');
    }

  });


};



var handleMultipleModals = function() {

  console.log('has multiple modals!')

};





/* ---------------------------------------------------
Single Exported Function
*/

(function($) {


  // When only one modal is on the page, 
  // it has this id, so we can avoid having
  // to iterate and keep things simple
  if ( $('#cropImageModal').length ) {

    handleSingleModal()


  // If not a single modal, check for existence 
  // of multiple modals (by checking for .js-cropModal)
  // and handle them
  } else if ( $(".js-cropModal").length ) {
    handleMultipleModals()
  }


})(jQuery);

