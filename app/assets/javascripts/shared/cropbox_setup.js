//= require cropbox
//= require shared/files








var modalLogic = function(scopeTo, cropbox_options) {
  
  $(".file_field").on('change', function() {
    var reader = new FileReader;
    reader.onload = function(e) {
      cropbox_options.imgSrc = e.target.result;
      window.cropper = $('.avatarBox', scopeTo).cropbox(cropbox_options);
      return $('.btnCrop, .btnZoomIn, .btnZoomOut', scopeTo).removeClass('disabled');
    };
    reader.readAsDataURL(this.files[0]);
    return this.files = [];
  });


  // Zoom Btns
  $('.btnZoomIn', scopeTo).on('click', function(){
    cropper.zoomIn()
  })
  $('.btnZoomOut', scopeTo).on('click', function(){
    cropper.zoomOut()
  })

  // Crop handler
  // Note - this was selected by a class of 
  //        the same name (as the id)... 
  $('.btnCrop', scopeTo).on('click', function() {

    var img = window.cropper.getDataURL();

    // Place the cropped image's datafile.
    return $('.cropped_image', scopeTo).html('<img src="' + img + '" width="420">');
  });



  // Crop handler
  $('.btnSaveClose', scopeTo).on('click', function() {

    var img = window.cropper.getDataURL();

    // Place the cropped image's datafile.
    $('.cropped_image', scopeTo).html('<img src="' + img + '" width="420">');

    // Place it to the default image. The one that triggers the modal.
    $('#saved_image').attr('src', img);

    // Place the datafile value in the hidden field
    $('.image_datafile', scopeTo).val(img);

    if ($('#refreshDetectedColors').is('*')) {
      return $('#refreshDetectedColors').trigger('click');
    }

  });
}



var modalLogic_multiple = function(scopeTo, cropbox_options) {

  var cropper = $('.imageBox', scopeTo).cropbox(cropbox_options);

  $(document).on('change', $(".file_field", scopeTo), function() {
    // var reader = new FileReader;
    // reader.onload = function(e) {
    //   cropbox_options.imgSrc = e.target.result;
    //   window.cropper = $('.avatarBox', scopeTo).cropbox(cropbox_options);
    //   return $('.btnCrop, .btnZoomIn, .btnZoomOut', scopeTo).removeClass('disabled');
    // };
    // reader.readAsDataURL(this.files[0]);
    // return this.files = [];

    var reader = new FileReader;
    reader.onload = function(e) {
      cropbox_options.imgSrc = e.target.result;
      cropper = $('.avatarBox', scopeTo).cropbox(cropbox_options);
      console.log(cropper)
      return $('.btnCrop, .btnZoomIn, .btnZoomOut', scopeTo).removeClass('disabled');
    };
    // TODO: 
    // problem here...
    reader.readAsDataURL($(".file_field", scopeTo)[0].files[0]);
    return this.files = [];
  });


  // Zoom Btns
  $(document).on('click', $('.btnZoomIn', scopeTo), function(){
    console.log('test')
    cropper.zoomIn()
  })
  $(document).on('click', $('.btnZoomOut', scopeTo), function(){
    cropper.zoomOut()
  })

  // Crop handler
  // Note - this was selected by a class of 
  //        the same name (as the id)... 
  $(document).on('click', $('.btnCrop', scopeTo), function() {

    var img = cropper.getDataURL();

    // Place the cropped image's datafile.
    return $('.cropped_image', scopeTo).html('<img src="' + img + '" width="420">');
  });



  // Crop handler
  $(document).on('click', $('.btnSaveClose', scopeTo), function() {

    var img = cropper.getDataURL();

    // Place the cropped image's datafile.
    $('.cropped_image', scopeTo).html('<img src="' + img + '" width="420">');

    // Place it to the default image. The one that triggers the modal.
    $('#saved_image').attr('src', img);

    // Place the datafile value in the hidden field
    $('.image_datafile', scopeTo).val(img);

    if ($('#refreshDetectedColors').is('*')) {
      return $('#refreshDetectedColors').trigger('click');
    }

  });
}








var handleSingleModal = function() {

  // START CROPBOX
  var cropbox_options = {
    thumbBox: '.thumbBox',
    spinner: '.spinner',
    imgSrc: $("#saved_image").attr('src')
  };


  var scopeTo = $('#cropImageModal')
  modalLogic(scopeTo, cropbox_options)

};



var handleMultipleModals = function() {

  // Outer wrapper for each modal on the page

  var modals = $(".js-cropModal")


  
  // Select all placehoder/saved images

  var savedImages = $('.js-savedImage')

  
  var cropbox_options
  var scopeTo
  // Set cropbox options for each

  savedImages.each( function(i) {

    currentImageID = $(modals[i]).attr('id')
    // console.log(currentImageID)
    scopeTo = $('#'+currentImageID)

    cropbox_options = {
      thumbBox: $('.thumbBox', scopeTo),
      spinner: $('.spinner', scopeTo),
      imgSrc: $(this).attr('src')
    };

    console.log(scopeTo)
    console.log(cropbox_options)

    modalLogic_multiple(scopeTo, cropbox_options)

  })



  
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

