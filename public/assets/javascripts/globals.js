(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


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


var mediaWidth = require('../utils/media-width')



module.exports = function() {

  // Navbar Toggle

  $("#navTrigger").click(function() {
    $("body").toggleClass("sb-is-open")
    $.get('/users/toggleSidebar')
  })


 
  console.log(mediaWidth());

  // this isn't working (no idea why):
  // if ( mediaWidth() === "mobile" ) 
  // for now just checking for existence of 
  // the variable, as it is only currently set
  // at below 700px

  if ( mediaWidth() ) {
    $("body").removeClass("sb-is-open");
  };

}
},{"../utils/media-width":7}],6:[function(require,module,exports){
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
},{"./global/global.bat-stats":2,"./global/global.inits":3,"./global/global.modals":4,"./global/global.sidebar":5}],7:[function(require,module,exports){
module.exports = function() {
  return window.getComputedStyle(
    document.querySelector('.width-indicator'), ':before'
  ).getPropertyValue('content')
} 

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy9wZXJjZW50LWNpcmNsZS5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWwvZ2xvYmFsLmJhdC1zdGF0cy5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWwvZ2xvYmFsLmluaXRzLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL2dsb2JhbC9nbG9iYWwubW9kYWxzLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL2dsb2JhbC9nbG9iYWwuc2lkZWJhci5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWxzLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL3V0aWxzL21lZGlhLXdpZHRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocGVyY2VudENpcmNsZSkge1xuXG4gIHBlcmNlbnRDaXJjbGUuZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG5cbiAgICAvLyBnZXQgdGhlIHBlcmNlbnRhZ2UsIHNldCB2aWEgZGF0YSBhdHRyaWJ1dGUgXG4gICAgdmFyIHBlcmNlbnRhZ2UgPSAkdGhpcy5kYXRhKCdwZXJjZW50YWdlJylcbiAgICB2YXIgY29sb3IgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtY29sb3InKVxuXG5cbiAgICAvLyBjb252ZXJ0IHN1cHBsaWVkIHZhbHVlIChwZXJjZW50YWdlLCAxLTEwMCkgaW50byBkZWdyZWUgKG91dCBvZiAzNjApXG4gICAgdmFyIGRlZ3JlZSA9IGNhbGN1bGF0ZURlZ3JlZShwZXJjZW50YWdlKVxuXG5cbiAgICBpZiAoZGVncmVlIDw9IDE4MCkge1xuXG4gICAgICAvLyBib3RoIGNvbG9ycyBoZXJlIGFyZSBlZmZlY3RpdmVseSBtYXNrIGNvbG9yc1xuXG4gICAgICAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAnbGluZWFyLWdyYWRpZW50KCcgKyAoOTArZGVncmVlKSArICdkZWcsIHRyYW5zcGFyZW50IDUwJSwgI0RFREVERSA1MCUpLCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNERURFREUgNTAlLCB0cmFuc3BhcmVudCA1MCUpJylcbiAgICAgIC8vICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScsICctd2Via2l0LWxpbmVhci1ncmFkaWVudCgnICsgKDkwK2RlZ3JlZSkgKyAnZGVnLCB0cmFuc3BhcmVudCA1MCUsICNERURFREUgNTAlKSwgLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoOTBkZWcsICNERURFREUgNTAlLCB0cmFuc3BhcmVudCA1MCUpJylcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIHRoZSBmaXJzdCBjb2xvciBoZXJlIG5lZWRzIHRvIGJlIHNldCB0byB0aGUgc2FtZSBhcyB0aGUgXG5cbiAgICAgICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScsICdsaW5lYXItZ3JhZGllbnQoJyArIChkZWdyZWUtOTApICsgJ2RlZywgdHJhbnNwYXJlbnQgNTAlLCAnK2NvbG9yKycgNTAlKSwgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjREVERURFIDUwJSwgdHJhbnNwYXJlbnQgNTAlKScpXG4gICAgICAvLyAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAnLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoJyArIChkZWdyZWUtOTApICsgJ2RlZywgdHJhbnNwYXJlbnQgNTAlLCAjREVERURFIDUwJSksIC13ZWJraXQtbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjREVERURFIDUwJSwgdHJhbnNwYXJlbnQgNTAlKScpXG5cbiAgICB9XG5cbiAgfSlcblxufVxuXG5cblxudmFyIGNhbGN1bGF0ZURlZ3JlZSA9IGZ1bmN0aW9uKHBlcmNlbnRhZ2UpIHtcbiAgdmFyIGRlZ3JlZSA9IHBlcmNlbnRhZ2UgKiAzLjZcbiAgcmV0dXJuIGRlZ3JlZVxufSIsInZhciBzZXRQZXJjZW50Q2lyY2xlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9wZXJjZW50LWNpcmNsZScpXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG5cbiAgc2V0UGVyY2VudENpcmNsZSggJCgnLmpzX3BlcmNlbnQtY2lyY2xlJykgKVxuXG5cbn0iLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuR2xvYmFscyAtIGluaXQgXG4oaW5pdGlhbGl6YWVycylcblxuKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG5cblxuICAvLyBJbml0IHNlbGVjdEJveFxuXG4gICQoJ3NlbGVjdCcpLnNlbGVjdEJveCh7J21vYmlsZSc6dHJ1ZX0pXG5cblxuXG5cbiAgLy8gVG9vbHRpcCBtZW51c1xuICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCh7aHRtbDogdHJ1ZX0pXG5cblxuXG5cbn0iLCJcblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICBcInVzZSBzdHJpY3RcIjtcblxuICAkKGRvY3VtZW50KS5vbignc2hvdy5icy5tb2RhbCcsICcubW9kYWwnLCBjZW50ZXJNb2RhbCk7XG5cblxuICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgICQoJy5tb2RhbDp2aXNpYmxlJykuZWFjaChjZW50ZXJNb2RhbCk7XG4gIH0pO1xuXG59XG5cblxuXG5cbi8qXG5cbkhlbHBlciBzY3JpcHRzIGZvciB0aGlzIG1vZHVsZVxuXG5Ob3Rlczpcbi0gaWYgYW55IG9mIHRoZXNlIG5lZWQgdG8gYmUgdXNlZCBpbiBvdGhlciBtb2R1bGVzLCBtb3ZlIHRoZW1cbiAgaW50byBhIGhlbHBlciBmaWxlICh0byB0aGVuIGJlIGltcG9ydGVkIGFuZCB1c2VkIGhlcmUpXG4qL1xuXG5cblxuZnVuY3Rpb24gY2VudGVyTW9kYWwoKSB7XG5cbiAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICB2YXIgJGRpYWxvZyAgICAgID0gJCh0aGlzKS5maW5kKFwiLm1vZGFsLWRpYWxvZ1wiKTtcbiAgdmFyIG9mZnNldCAgICAgICA9ICgkKHdpbmRvdykuaGVpZ2h0KCkgLSAkZGlhbG9nLmhlaWdodCgpKSAvIDI7XG4gIHZhciBib3R0b21NYXJnaW4gPSBwYXJzZUludCgkZGlhbG9nLmNzcygnbWFyZ2luQm90dG9tJyksIDEwKTtcblxuICAvLyBNYWtlIHN1cmUgeW91IGRvbid0IGhpZGUgdGhlIHRvcCBwYXJ0IG9mIHRoZSBtb2RhbCB3LyBhIG5lZ2F0aXZlIG1hcmdpbiBpZiBpdCdzIGxvbmdlciB0aGFuIHRoZSBzY3JlZW4gaGVpZ2h0LCBhbmQga2VlcCB0aGUgbWFyZ2luIGVxdWFsIHRvIHRoZSBib3R0b20gbWFyZ2luIG9mIHRoZSBtb2RhbFxuICBpZihvZmZzZXQgPCBib3R0b21NYXJnaW4pIHtcbiAgICBvZmZzZXQgPSBib3R0b21NYXJnaW47XG4gIH1cblxuICAkZGlhbG9nLmNzcyhcIm1hcmdpbi10b3BcIiwgb2Zmc2V0KTtcbiAgXG59IiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbkdsb2JhbHMgLSBTaWRlYmFyXG5cbiovXG5cblxudmFyIG1lZGlhV2lkdGggPSByZXF1aXJlKCcuLi91dGlscy9tZWRpYS13aWR0aCcpXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIE5hdmJhciBUb2dnbGVcblxuICAkKFwiI25hdlRyaWdnZXJcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJChcImJvZHlcIikudG9nZ2xlQ2xhc3MoXCJzYi1pcy1vcGVuXCIpXG4gICAgJC5nZXQoJy91c2Vycy90b2dnbGVTaWRlYmFyJylcbiAgfSlcblxuXG4gXG4gIGNvbnNvbGUubG9nKG1lZGlhV2lkdGgoKSk7XG5cbiAgLy8gdGhpcyBpc24ndCB3b3JraW5nIChubyBpZGVhIHdoeSk6XG4gIC8vIGlmICggbWVkaWFXaWR0aCgpID09PSBcIm1vYmlsZVwiICkgXG4gIC8vIGZvciBub3cganVzdCBjaGVja2luZyBmb3IgZXhpc3RlbmNlIG9mIFxuICAvLyB0aGUgdmFyaWFibGUsIGFzIGl0IGlzIG9ubHkgY3VycmVudGx5IHNldFxuICAvLyBhdCBiZWxvdyA3MDBweFxuXG4gIGlmICggbWVkaWFXaWR0aCgpICkge1xuICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2ItaXMtb3BlblwiKTtcbiAgfTtcblxufSIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5HbG9iYWwgU2NyaXB0c1xuXG4qL1xuXG5cblxuXG52YXIgZ2xvYmFsSW5pdGlhbGl6ZXJzID0gcmVxdWlyZSgnLi9nbG9iYWwvZ2xvYmFsLmluaXRzJylcbmdsb2JhbEluaXRpYWxpemVycygpXG5cbnZhciBzaWRlYmFySW5pdCA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5zaWRlYmFyJylcbnNpZGViYXJJbml0KClcblxudmFyIGdsb2JhbE1vZGFscyA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5tb2RhbHMnKVxuZ2xvYmFsTW9kYWxzKClcblxudmFyIGJhdHRlcnlTdGF0dXNlcyA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5iYXQtc3RhdHMnKVxuYmF0dGVyeVN0YXR1c2VzKCkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpZHRoLWluZGljYXRvcicpLCAnOmJlZm9yZSdcbiAgKS5nZXRQcm9wZXJ0eVZhbHVlKCdjb250ZW50Jylcbn0gXG4iXX0=
