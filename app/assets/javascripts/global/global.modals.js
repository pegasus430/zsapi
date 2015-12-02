
var Masonry = require('masonry-layout')
var imagesLoaded = require('imagesloaded')





module.exports = function() {

  "use strict";

  $(document).on('show.bs.modal', '.modal', centerModal);
  
  $(document).on('show.bs.modal', '.modal-gallery', modalGallery);

  $(window).on("resize", function () {
    $('.modal:visible').each(centerModal);
  });

}







/*

Helper scripts for this module

Notes:
- if any of these need to be used in other modules, move them
  into a helper file (to then be imported and used here)
*/



function centerModal() {

  $(this).css('display', 'block');

  var $dialog      = $(this).find(".modal-dialog");
  var offset       = ($(window).height() - $dialog.height()) / 2;
  var bottomMargin = parseInt($dialog.css('marginBottom'), 10);

  // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
  if(offset < bottomMargin) {
    offset = bottomMargin;
  }

  $dialog.css("margin-top", offset);
  
}



function modalGallery() {
  
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



}