var Masonry = require('masonry-layout')
var imagesLoaded = require('imagesloaded')







var initiateMasonry = function() {  

  var isoContainer = document.querySelector('.masonryContainer');
  imagesLoaded( isoContainer, function() {

    var msnry = new Masonry( isoContainer, {
      itemSelector: '.campaign-card_wrap',
      columnWidth: '#masonrySizer',
      percentPosition: true
    })

  })
}



module.exports = function() {

  initiateMasonry()

}