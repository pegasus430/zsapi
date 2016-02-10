var Masonry = require('masonry-layout')
var imagesLoaded = require('imagesloaded')

var getDataUri = require('./../utils/image-to-data')





module.exports = function() {

  /*
  Initiate Masonry (for masonry layout of images)
  */

  $(document).on('show.bs.modal', '.modal-gallery', initiateMasonry);


  /*
  Handle Gallery Image Clicks (selection/deselection)
  */

  handleGallerySelection()


  /*
  Handle Gallery Save/Update
  */

  handleGallerySave()


}





var initiateMasonry = function() {  

  var isoContainer = document.querySelector('.modal-gallery_container');
  imagesLoaded( isoContainer, function() {

    var msnry = new Masonry( isoContainer, {
      itemSelector: '.modal-gallery_item',
      columnWidth: '#modalGallerySizer'
    })

  })
}



var modalGalleryItems = $('.modal-gallery_item')
var btn_confirmSelection = $('#btnGalleryConfirm')
var selected = ""
var initiallySetImage = $('#saved_image').attr('src')


var handleGallerySelection = function() {

  modalGalleryItems.on('click', function() {
    
    
    // If already selected: 
    // 1. deselect 
    // 2. set selected var to empty string 
    //    in order to reset initially set image

    if ( $(this).hasClass('selected') ) {
      
      $(this).removeClass('selected')

      selected = ''

    // If not already selected:
    // 1. unset previously set, if any
    // 2. set as selected
    // 3. replace initially set image with this image

    } else {

      modalGalleryItems.removeClass('selected')
      $(this).addClass('selected')

      // assign selected node to variable
      selected = $(this).find('img')

    }

  })
  
}



var handleGallerySave = function() {

  btn_confirmSelection.click(function() {

    // Close Modal
    $('#galleryModal').modal('hide')


    if ( selected.length ) {

      // replace the placeholder with selected image

      var selectedSrc = selected.attr('src')
      $('#saved_image').attr('src', selectedSrc)


      // Add imageAsDataUri to hidden form field 
      // in order to properly save 
      
      getDataUri(selectedSrc, function(dataUri) {

        $('#image_datafile').attr('value', dataUri)

      })



    } else {

      // if deselecting a previously selected
      // image, re-set the origianlly selected image (placeholder 
      // if a new campaign, otherwise the current campaign image)

      $('#saved_image').attr('src', initiallySetImage)

    }

  })

}