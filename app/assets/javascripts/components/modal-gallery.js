var Masonry = require('masonry-layout')
var imagesLoaded = require('imagesloaded')





module.exports = function() {

  $(document).on('show.bs.modal', '.modal-gallery', modalGallery);

}




var modalGallery = function() {
  
  var isoContainer = document.querySelector('.modal-gallery_container');

  imagesLoaded( isoContainer, function() {

    var msnry = new Masonry( isoContainer, {
      itemSelector: '.modal-gallery_item',
      columnWidth: '#modalGallerySizer'
    })

  })


  var modalGalleryItems = $('.modal-gallery_item')
  var selectedCount = 0
  var btn_confirmSelection = $('#btnGalleryConfirm')


  modalGalleryItems.each(function() {
    $(this).on('click', function() {
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


  // Save/Confirm Selection
  $('#btnGalleryConfirm').click(function() {
    
  })


}