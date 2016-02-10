var Masonry = require('masonry-layout')
var imagesLoaded = require('imagesloaded')







module.exports = function() {  

  var isoContainer = document.querySelector('.masonryContainer');

  if ( isoContainer !== undefined || isoContainer !== null ) { 

    imagesLoaded( isoContainer, function() {

      var msnry = new Masonry( isoContainer, {
        itemSelector: '.campaign-card_wrap',
        columnWidth: '#masonrySizer',
        percentPosition: true
      })

    })

  }
}
