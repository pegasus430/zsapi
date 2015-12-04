var Masonry = require('masonry-layout')
var imagesLoaded = require('imagesloaded')





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
var selectedCount = $('.modal-gallery_item.selected').length
var btn_confirmSelection = $('#btnGalleryConfirm')

var selectedArray = []


var handleGallerySelection = function() {



  modalGalleryItems.each(function() {
    $(this).on('click', function() {
      
      // Toggle Active Class

      $(this).toggleClass('selected')
      

      // Increment/Decrement selected count

      var index = selectedArray.indexOf($(this))


      if ( $(this).hasClass('selected') ) {
        selectedCount += 1
        // selectedArray.push($(this).find(".modal-gallery_image"))
        selectedArray.push($(this))
      } else {
        selectedCount -= 1
        selectedArray.splice(index, 1)
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

  var selectedImages = $('.modal-gallery_item.selected img')


  btn_confirmSelection.click(function() {

    // Close Modal
    $('#galleryModal').modal('hide')


    if ( selectedCount > 0 ) {


      // hide the placeholder 

      $('#saved_image').addClass('hide-content')


      // create a div for showing selected images (if not alread created)

      if ( !$("#imagesSelectedFromGallery").length ) {
        $('#saved_image').after("<div id='imagesSelectedFromGallery' class='imagesSelectedFromGallery'></div>")
      }


      // loop throgh selected images and append them to preview

      for (index = 0; index < selectedArray.length; ++index) {
        
        // get the image

        var img = selectedArray[index]

        
        // replace the placeholder with it

        $('#imagesSelectedFromGallery').append(img.removeAttr('style'))

      }


      // init Masonry on the preview images (for proper alignment)

      initSelectedDisplayMasonry()

    } else {
    
      // TODO: This needs to be finished... there needs to be a way to remove 
      // selected images and then (here) the modal needs to be updated

      $('#saved_image').show()
      $('#imagesSelectedFromGallery').remove()
    }



  })

}


var initSelectedDisplayMasonry = function() {
  var isoContainer = document.querySelector('#imagesSelectedFromGallery');
    imagesLoaded( isoContainer, function() {

      var msnry = new Masonry( isoContainer, {
        itemSelector: '.modal-gallery_item'
        // columnWidth: '22'
      })

    })
}