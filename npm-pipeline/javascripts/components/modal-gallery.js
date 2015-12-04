var Masonry = require('masonry-layout')
var imagesLoaded = require('imagesloaded')





module.exports = function() {

  $(document).on('show.bs.modal', '.modal-gallery', initiateMasonry);

  handleGallerySelection()

  handleGallerySave()

}





/*
Initiate Masonry (for masonry layout of images)
*/

var initiateMasonry = function() {  

  var isoContainer = document.querySelector('.modal-gallery_container');
  imagesLoaded( isoContainer, function() {

    var msnry = new Masonry( isoContainer, {
      itemSelector: '.modal-gallery_item',
      columnWidth: '#modalGallerySizer'
    })

  })
}




var handleGallerySelection = function() {

  // Handle image selection/deselection inside modal

  var modalGalleryItems = $('.modal-gallery_item')
  var selectedCount = $('.modal-gallery_item.selected').length
  var btn_confirmSelection = $('#btnGalleryConfirm')


  modalGalleryItems.each(function() {
    $(this).on('click', function() {
      
      // Toggle Active Class

      $(this).toggleClass('selected')
      

      // Increment/Decrement selected count

      if ( $(this).hasClass('selected') ) {
        selectedCount += 1
      } else {
        selectedCount -= 1
      }


      // Enable/Disable confirm btn

      if ( selectedCount > 0 ) {
        btn_confirmSelection.removeClass('btn-disabled')
      } else {
        btn_confirmSelection.addClass('btn-disabled')
      }

    })
  })
  
}


var handleGallerySave = function() {

  // Save/Confirm Selection (button)

  var selectedImages = $('.modal-gallery_item.selected img')

  $('#btnGalleryConfirm').click(function() {

    // Close Modal
    $('#galleryModal').modal('hide')


  })

}



