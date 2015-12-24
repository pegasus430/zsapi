//= require cropbox
//= require shared/files





var handleSingleModal = function() {
  var singleModal = $('#cropImageModal')

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
      window.cropper = $('.avatarBox', singleModal).cropbox(cropbox_options);
      return $('.btnCrop, .btnZoomIn, .btnZoomOut', singleModal).removeClass('disabled');
    };
    reader.readAsDataURL(this.files[0]);
    return this.files = [];
  });


  // Zoom Btns
  $('.btnZoomIn', singleModal).on('click', function(){
    console.log('clicked!')
    cropper.zoomIn()
  })
  $('.btnZoomOut', singleModal).on('click', function(){
    cropper.zoomOut()
  })

  // Crop handler
  // Note - this was selected by a class of 
  //        the same name (as the id)... 
  $('.btnCrop', singleModal).on('click', function() {

    var img = window.cropper.getDataURL();

    // Place the cropped image's datafile.
    return $('.cropped_image', singleModal).html('<img src="' + img + '" width="420">');
  });



  // Crop handler
  $('.btnSaveClose', singleModal).on('click', function() {

    var img = window.cropper.getDataURL();

    // Place the cropped image's datafile.
    $('.cropped_image', singleModal).html('<img src="' + img + '" width="420">');

    // Place it to the default image. The one that triggers the modal.
    $('#saved_image').attr('src', img);

    // Place the datafile value in the hidden field
    $('.image_datafile', singleModal).val(img);

    if ($('#refreshDetectedColors').is('*')) {
      return $('#refreshDetectedColors').trigger('click');
    }

  });


};





/* ---------------------------------------------------
Single Exported Function
*/

(function($) {


  // When only one modal is on the page, 
  // it has this id, so we can avoid having
  // to iterate and keep things simple
  var singleModal = $('#cropImageModal')


  if ( !!singleModal ) {
    handleSingleModal()
  }

  

})(jQuery);

