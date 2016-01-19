(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


module.exports = function(percentCircle) {

  percentCircle.each(function() {
    var $this = $(this)

    // get the percentage, set via data attribute 
    var percentage = $this.data('percentage')
    var color = $this.css('background-color')


    // convert supplied value (percentage, 1-100) into degree (out of 360)
    var degree = calculateDegree(percentage)


    if (degree <= 180) {

      // both colors here are effectively mask colors

      $this.css('background-image', 'linear-gradient(' + (90+degree) + 'deg, transparent 50%, #DEDEDE 50%), linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')
      // $this.css('background-image', '-webkit-linear-gradient(' + (90+degree) + 'deg, transparent 50%, #DEDEDE 50%), -webkit-linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')

    } else {

      // the first color here needs to be set to the same as the 

      $this.css('background-image', 'linear-gradient(' + (degree-90) + 'deg, transparent 50%, '+color+' 50%), linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')
      // $this.css('background-image', '-webkit-linear-gradient(' + (degree-90) + 'deg, transparent 50%, #DEDEDE 50%), -webkit-linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')

    }

  })

}



var calculateDegree = function(percentage) {
  var degree = percentage * 3.6
  return degree
}
},{}],2:[function(require,module,exports){
var setPercentCircle = require('../components/percent-circle')



module.exports = function() {


  setPercentCircle( $('.js_percent-circle') )


}
},{"../components/percent-circle":1}],3:[function(require,module,exports){
/* ---------------------------------------

Globals - init 
(initializaers)

*/


module.exports = function() {



  // Init selectBox

  $('select').selectBox({'mobile':true})




  // Tooltip menus
  $('[data-toggle="tooltip"]').tooltip({html: true})




}
},{}],4:[function(require,module,exports){





module.exports = function() {

  "use strict";

  $(document).on('show.bs.modal', '.modal', centerModal);


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
},{}],5:[function(require,module,exports){
/* ---------------------------------------

Globals - Sidebar

*/


module.exports = function() {

  // Navbar Toggle

  $("#navTrigger").click(function() {
    $("body").toggleClass("sb-is-open")
    $.get('/users/toggleSidebar')
  })

}
},{}],6:[function(require,module,exports){
/* ---------------------------------------

Global Scripts

*/




var globalInitializers = require('./global/global.inits')
globalInitializers()

var sidebarInit = require('./global/global.sidebar')
sidebarInit()

var globalModals = require('./global/global.modals')
globalModals()

var batteryStatuses = require('./global/global.bat-stats')
batteryStatuses()
},{"./global/global.bat-stats":2,"./global/global.inits":3,"./global/global.modals":4,"./global/global.sidebar":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy9wZXJjZW50LWNpcmNsZS5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWwvZ2xvYmFsLmJhdC1zdGF0cy5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWwvZ2xvYmFsLmluaXRzLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL2dsb2JhbC9nbG9iYWwubW9kYWxzLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL2dsb2JhbC9nbG9iYWwuc2lkZWJhci5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihwZXJjZW50Q2lyY2xlKSB7XG5cbiAgcGVyY2VudENpcmNsZS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciAkdGhpcyA9ICQodGhpcylcblxuICAgIC8vIGdldCB0aGUgcGVyY2VudGFnZSwgc2V0IHZpYSBkYXRhIGF0dHJpYnV0ZSBcbiAgICB2YXIgcGVyY2VudGFnZSA9ICR0aGlzLmRhdGEoJ3BlcmNlbnRhZ2UnKVxuICAgIHZhciBjb2xvciA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1jb2xvcicpXG5cblxuICAgIC8vIGNvbnZlcnQgc3VwcGxpZWQgdmFsdWUgKHBlcmNlbnRhZ2UsIDEtMTAwKSBpbnRvIGRlZ3JlZSAob3V0IG9mIDM2MClcbiAgICB2YXIgZGVncmVlID0gY2FsY3VsYXRlRGVncmVlKHBlcmNlbnRhZ2UpXG5cblxuICAgIGlmIChkZWdyZWUgPD0gMTgwKSB7XG5cbiAgICAgIC8vIGJvdGggY29sb3JzIGhlcmUgYXJlIGVmZmVjdGl2ZWx5IG1hc2sgY29sb3JzXG5cbiAgICAgICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScsICdsaW5lYXItZ3JhZGllbnQoJyArICg5MCtkZWdyZWUpICsgJ2RlZywgdHJhbnNwYXJlbnQgNTAlLCAjREVERURFIDUwJSksIGxpbmVhci1ncmFkaWVudCg5MGRlZywgI0RFREVERSA1MCUsIHRyYW5zcGFyZW50IDUwJSknKVxuICAgICAgLy8gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJy13ZWJraXQtbGluZWFyLWdyYWRpZW50KCcgKyAoOTArZGVncmVlKSArICdkZWcsIHRyYW5zcGFyZW50IDUwJSwgI0RFREVERSA1MCUpLCAtd2Via2l0LWxpbmVhci1ncmFkaWVudCg5MGRlZywgI0RFREVERSA1MCUsIHRyYW5zcGFyZW50IDUwJSknKVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gdGhlIGZpcnN0IGNvbG9yIGhlcmUgbmVlZHMgdG8gYmUgc2V0IHRvIHRoZSBzYW1lIGFzIHRoZSBcblxuICAgICAgJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ2xpbmVhci1ncmFkaWVudCgnICsgKGRlZ3JlZS05MCkgKyAnZGVnLCB0cmFuc3BhcmVudCA1MCUsICcrY29sb3IrJyA1MCUpLCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNERURFREUgNTAlLCB0cmFuc3BhcmVudCA1MCUpJylcbiAgICAgIC8vICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScsICctd2Via2l0LWxpbmVhci1ncmFkaWVudCgnICsgKGRlZ3JlZS05MCkgKyAnZGVnLCB0cmFuc3BhcmVudCA1MCUsICNERURFREUgNTAlKSwgLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoOTBkZWcsICNERURFREUgNTAlLCB0cmFuc3BhcmVudCA1MCUpJylcblxuICAgIH1cblxuICB9KVxuXG59XG5cblxuXG52YXIgY2FsY3VsYXRlRGVncmVlID0gZnVuY3Rpb24ocGVyY2VudGFnZSkge1xuICB2YXIgZGVncmVlID0gcGVyY2VudGFnZSAqIDMuNlxuICByZXR1cm4gZGVncmVlXG59IiwidmFyIHNldFBlcmNlbnRDaXJjbGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3BlcmNlbnQtY2lyY2xlJylcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cblxuICBzZXRQZXJjZW50Q2lyY2xlKCAkKCcuanNfcGVyY2VudC1jaXJjbGUnKSApXG5cblxufSIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5HbG9iYWxzIC0gaW5pdCBcbihpbml0aWFsaXphZXJzKVxuXG4qL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cblxuXG4gIC8vIEluaXQgc2VsZWN0Qm94XG5cbiAgJCgnc2VsZWN0Jykuc2VsZWN0Qm94KHsnbW9iaWxlJzp0cnVlfSlcblxuXG5cblxuICAvLyBUb29sdGlwIG1lbnVzXG4gICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtodG1sOiB0cnVlfSlcblxuXG5cblxufSIsIlxuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gICQoZG9jdW1lbnQpLm9uKCdzaG93LmJzLm1vZGFsJywgJy5tb2RhbCcsIGNlbnRlck1vZGFsKTtcblxuXG4gICQod2luZG93KS5vbihcInJlc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgJCgnLm1vZGFsOnZpc2libGUnKS5lYWNoKGNlbnRlck1vZGFsKTtcbiAgfSk7XG5cbn1cblxuXG5cblxuLypcblxuSGVscGVyIHNjcmlwdHMgZm9yIHRoaXMgbW9kdWxlXG5cbk5vdGVzOlxuLSBpZiBhbnkgb2YgdGhlc2UgbmVlZCB0byBiZSB1c2VkIGluIG90aGVyIG1vZHVsZXMsIG1vdmUgdGhlbVxuICBpbnRvIGEgaGVscGVyIGZpbGUgKHRvIHRoZW4gYmUgaW1wb3J0ZWQgYW5kIHVzZWQgaGVyZSlcbiovXG5cblxuXG5mdW5jdGlvbiBjZW50ZXJNb2RhbCgpIHtcblxuICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG4gIHZhciAkZGlhbG9nICAgICAgPSAkKHRoaXMpLmZpbmQoXCIubW9kYWwtZGlhbG9nXCIpO1xuICB2YXIgb2Zmc2V0ICAgICAgID0gKCQod2luZG93KS5oZWlnaHQoKSAtICRkaWFsb2cuaGVpZ2h0KCkpIC8gMjtcbiAgdmFyIGJvdHRvbU1hcmdpbiA9IHBhcnNlSW50KCRkaWFsb2cuY3NzKCdtYXJnaW5Cb3R0b20nKSwgMTApO1xuXG4gIC8vIE1ha2Ugc3VyZSB5b3UgZG9uJ3QgaGlkZSB0aGUgdG9wIHBhcnQgb2YgdGhlIG1vZGFsIHcvIGEgbmVnYXRpdmUgbWFyZ2luIGlmIGl0J3MgbG9uZ2VyIHRoYW4gdGhlIHNjcmVlbiBoZWlnaHQsIGFuZCBrZWVwIHRoZSBtYXJnaW4gZXF1YWwgdG8gdGhlIGJvdHRvbSBtYXJnaW4gb2YgdGhlIG1vZGFsXG4gIGlmKG9mZnNldCA8IGJvdHRvbU1hcmdpbikge1xuICAgIG9mZnNldCA9IGJvdHRvbU1hcmdpbjtcbiAgfVxuXG4gICRkaWFsb2cuY3NzKFwibWFyZ2luLXRvcFwiLCBvZmZzZXQpO1xuICBcbn0iLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuR2xvYmFscyAtIFNpZGViYXJcblxuKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIE5hdmJhciBUb2dnbGVcblxuICAkKFwiI25hdlRyaWdnZXJcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJChcImJvZHlcIikudG9nZ2xlQ2xhc3MoXCJzYi1pcy1vcGVuXCIpXG4gICAgJC5nZXQoJy91c2Vycy90b2dnbGVTaWRlYmFyJylcbiAgfSlcblxufSIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5HbG9iYWwgU2NyaXB0c1xuXG4qL1xuXG5cblxuXG52YXIgZ2xvYmFsSW5pdGlhbGl6ZXJzID0gcmVxdWlyZSgnLi9nbG9iYWwvZ2xvYmFsLmluaXRzJylcbmdsb2JhbEluaXRpYWxpemVycygpXG5cbnZhciBzaWRlYmFySW5pdCA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5zaWRlYmFyJylcbnNpZGViYXJJbml0KClcblxudmFyIGdsb2JhbE1vZGFscyA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5tb2RhbHMnKVxuZ2xvYmFsTW9kYWxzKClcblxudmFyIGJhdHRlcnlTdGF0dXNlcyA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5iYXQtc3RhdHMnKVxuYmF0dGVyeVN0YXR1c2VzKCkiXX0=
