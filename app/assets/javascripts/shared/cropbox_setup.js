//= require cropbox
//= require shared/files





/*
Modal logic when only one uploader is present 
on a page.
This was more or less the original logic for the 
upload when I (Isaac) came on board the project
*/

var modalLogic = function(scopeTo, cropbox_options) {
  
  $(".file_field").on('change', function() {
    var reader = new FileReader;
    reader.onload = function(e) {
      cropbox_options.imgSrc = e.target.result
      window.cropper = $('.avatarBox', scopeTo).cropbox(cropbox_options)
      return $('.btnCrop, .btnZoomIn, .btnZoomOut', scopeTo).removeClass('disabled')
    }
    reader.readAsDataURL(this.files[0])
    return this.files = []
  })


  function updatePreview() {
    var img = window.cropper.getDataURL()
    // Place the cropped image's datafile.
    return $('.cropped_image', scopeTo).html('<img src="' + img + '" width="420">')
  }

  // Zoom Btns
  $('.btnZoomIn', scopeTo).on('click', function(){
    cropper.zoomIn()
    updatePreview()
  })
  $('.btnZoomOut', scopeTo).on('click', function(){
    cropper.zoomOut()
    updatePreview()
  })

  // Crop handler
  // Note - this was selected by a class of 
  //        the same name (as the id)... 
  $('.btnCrop', scopeTo).on('click', function() {
    updatePreview()
  })

  // Crop handler
  $('.btnSaveClose', scopeTo).on('click', function() {

    var img = window.cropper.getDataURL()

    // Place the cropped image's datafile.
    $('.cropped_image', scopeTo).html('<img src="' + img + '" width="420">')

    // Place it to the default image. The one that triggers the modal.
    $('#saved_image').attr('src', img)

    // Place the datafile value in the hidden field
    $('.image_datafile', scopeTo).val(img)

    if ($('#refreshDetectedColors').is('*')) {
      return $('#refreshDetectedColors').trigger('click')
    }

  })
}



/*
Modal logic for when more than one uploader is present on 
a page.
More or less a replication of the above approach, but used 
within the context of a loop and scoped appropriately.
*/

var modalLogic_multiple = function(scopeTo, cropbox_options, currentImageID) {
  
  var cropper
  var reader
  var img

  cropper = $('.imageBox', scopeTo).cropbox(cropbox_options)

  scopeTo.on('change', $(".file_field", scopeTo), function(e) {
    reader = new FileReader()
    reader.onload = function(e) {
      cropbox_options.imgSrc = e.target.result
      cropper = $('.avatarBox', scopeTo).cropbox(cropbox_options)
      return $('.btnCrop, .btnZoomIn, .btnZoomOut', scopeTo).removeClass('disabled')
    }
    reader.readAsDataURL(this.querySelector('.file_field').files[0])
    return this.querySelector('.file_field').files = []
  })


  function updatePreview() {
    img = cropper.getDataURL()
    // Place the cropped image's datafile.
    return $('.cropped_image', scopeTo).html('<img src="' + img + '" width="420">')
  }

  // Zoom Btns
  $('.btnZoomIn', scopeTo).on('click', function(){
    cropper.zoomIn()
    updatePreview()
  })
  $('.btnZoomOut', scopeTo).on('click', function(){
    cropper.zoomOut()
    updatePreview()
  })


  // Crop handler
  $('.btnCrop', scopeTo).on('click', function() {
    updatePreview()
  })



  // Crop handler
  $('.btnSaveClose', scopeTo).on('click', function() {

    img = cropper.getDataURL()

    // Place the cropped image's datafile.
    $('.cropped_image', scopeTo).html('<img src="' + img + '" width="420">')

    // Place it to the default image. The one that triggers the modal.
    $('[data-target="#'+currentImageID+'"]').attr('src', img)

    // Place the datafile value in the hidden field
    $('[data-uploadtarget="'+currentImageID+'"').val(img)

  })
}










var handleSingleModal = function() {

  // START CROPBOX
  var cropbox_options = {
    thumbBox: '.thumbBox',
    spinner: '.spinner',
    imgSrc: $("#saved_image").attr('src')
  }

  var scopeTo = $('#cropImageModal')

  modalLogic(scopeTo, cropbox_options)

}



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
    
    // Since placeholder images have the class '.js-savedImage', it's 
    // necessary to check for the presence of 
    if ( currentImageID !== undefined || currentImageID !== null ) {

      scopeTo = $('#'+currentImageID)

      cropbox_options = {
        thumbBox: $('.thumbBox', scopeTo),
        spinner: $('.spinner', scopeTo),
        imgSrc: $(this).attr('src')
      }

      modalLogic_multiple(scopeTo, cropbox_options, currentImageID)

    } // end if

  })



  
}





/* ---------------------------------------------------
Single Exported Function
*/

!(function($) {


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


})(jQuery)