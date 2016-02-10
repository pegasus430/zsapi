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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy9wZXJjZW50LWNpcmNsZS5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWwvZ2xvYmFsLmJhdC1zdGF0cy5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWwvZ2xvYmFsLmluaXRzLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL2dsb2JhbC9nbG9iYWwubW9kYWxzLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL2dsb2JhbC9nbG9iYWwuc2lkZWJhci5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWxzLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL3V0aWxzL21lZGlhLXdpZHRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHBlcmNlbnRDaXJjbGUpIHtcblxuICBwZXJjZW50Q2lyY2xlLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdmFyICR0aGlzID0gJCh0aGlzKVxuXG4gICAgLy8gZ2V0IHRoZSBwZXJjZW50YWdlLCBzZXQgdmlhIGRhdGEgYXR0cmlidXRlIFxuICAgIHZhciBwZXJjZW50YWdlID0gJHRoaXMuZGF0YSgncGVyY2VudGFnZScpXG4gICAgdmFyIGNvbG9yID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJylcblxuXG4gICAgLy8gY29udmVydCBzdXBwbGllZCB2YWx1ZSAocGVyY2VudGFnZSwgMS0xMDApIGludG8gZGVncmVlIChvdXQgb2YgMzYwKVxuICAgIHZhciBkZWdyZWUgPSBjYWxjdWxhdGVEZWdyZWUocGVyY2VudGFnZSlcblxuXG4gICAgaWYgKGRlZ3JlZSA8PSAxODApIHtcblxuICAgICAgLy8gYm90aCBjb2xvcnMgaGVyZSBhcmUgZWZmZWN0aXZlbHkgbWFzayBjb2xvcnNcblxuICAgICAgJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ2xpbmVhci1ncmFkaWVudCgnICsgKDkwK2RlZ3JlZSkgKyAnZGVnLCB0cmFuc3BhcmVudCA1MCUsICNERURFREUgNTAlKSwgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjREVERURFIDUwJSwgdHJhbnNwYXJlbnQgNTAlKScpXG4gICAgICAvLyAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAnLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoJyArICg5MCtkZWdyZWUpICsgJ2RlZywgdHJhbnNwYXJlbnQgNTAlLCAjREVERURFIDUwJSksIC13ZWJraXQtbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjREVERURFIDUwJSwgdHJhbnNwYXJlbnQgNTAlKScpXG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyB0aGUgZmlyc3QgY29sb3IgaGVyZSBuZWVkcyB0byBiZSBzZXQgdG8gdGhlIHNhbWUgYXMgdGhlIFxuXG4gICAgICAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAnbGluZWFyLWdyYWRpZW50KCcgKyAoZGVncmVlLTkwKSArICdkZWcsIHRyYW5zcGFyZW50IDUwJSwgJytjb2xvcisnIDUwJSksIGxpbmVhci1ncmFkaWVudCg5MGRlZywgI0RFREVERSA1MCUsIHRyYW5zcGFyZW50IDUwJSknKVxuICAgICAgLy8gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJy13ZWJraXQtbGluZWFyLWdyYWRpZW50KCcgKyAoZGVncmVlLTkwKSArICdkZWcsIHRyYW5zcGFyZW50IDUwJSwgI0RFREVERSA1MCUpLCAtd2Via2l0LWxpbmVhci1ncmFkaWVudCg5MGRlZywgI0RFREVERSA1MCUsIHRyYW5zcGFyZW50IDUwJSknKVxuXG4gICAgfVxuXG4gIH0pXG5cbn1cblxuXG5cbnZhciBjYWxjdWxhdGVEZWdyZWUgPSBmdW5jdGlvbihwZXJjZW50YWdlKSB7XG4gIHZhciBkZWdyZWUgPSBwZXJjZW50YWdlICogMy42XG4gIHJldHVybiBkZWdyZWVcbn0iLCJ2YXIgc2V0UGVyY2VudENpcmNsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGVyY2VudC1jaXJjbGUnKVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuXG4gIHNldFBlcmNlbnRDaXJjbGUoICQoJy5qc19wZXJjZW50LWNpcmNsZScpIClcblxuXG59IiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbkdsb2JhbHMgLSBpbml0IFxuKGluaXRpYWxpemFlcnMpXG5cbiovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuXG5cbiAgLy8gSW5pdCBzZWxlY3RCb3hcblxuICAkKCdzZWxlY3QnKS5zZWxlY3RCb3goeydtb2JpbGUnOnRydWV9KVxuXG5cblxuXG4gIC8vIFRvb2x0aXAgbWVudXNcbiAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe2h0bWw6IHRydWV9KVxuXG5cblxuXG59IiwiXG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgJChkb2N1bWVudCkub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgY2VudGVyTW9kYWwpO1xuXG5cbiAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCcubW9kYWw6dmlzaWJsZScpLmVhY2goY2VudGVyTW9kYWwpO1xuICB9KTtcblxufVxuXG5cblxuXG4vKlxuXG5IZWxwZXIgc2NyaXB0cyBmb3IgdGhpcyBtb2R1bGVcblxuTm90ZXM6XG4tIGlmIGFueSBvZiB0aGVzZSBuZWVkIHRvIGJlIHVzZWQgaW4gb3RoZXIgbW9kdWxlcywgbW92ZSB0aGVtXG4gIGludG8gYSBoZWxwZXIgZmlsZSAodG8gdGhlbiBiZSBpbXBvcnRlZCBhbmQgdXNlZCBoZXJlKVxuKi9cblxuXG5cbmZ1bmN0aW9uIGNlbnRlck1vZGFsKCkge1xuXG4gICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgdmFyICRkaWFsb2cgICAgICA9ICQodGhpcykuZmluZChcIi5tb2RhbC1kaWFsb2dcIik7XG4gIHZhciBvZmZzZXQgICAgICAgPSAoJCh3aW5kb3cpLmhlaWdodCgpIC0gJGRpYWxvZy5oZWlnaHQoKSkgLyAyO1xuICB2YXIgYm90dG9tTWFyZ2luID0gcGFyc2VJbnQoJGRpYWxvZy5jc3MoJ21hcmdpbkJvdHRvbScpLCAxMCk7XG5cbiAgLy8gTWFrZSBzdXJlIHlvdSBkb24ndCBoaWRlIHRoZSB0b3AgcGFydCBvZiB0aGUgbW9kYWwgdy8gYSBuZWdhdGl2ZSBtYXJnaW4gaWYgaXQncyBsb25nZXIgdGhhbiB0aGUgc2NyZWVuIGhlaWdodCwgYW5kIGtlZXAgdGhlIG1hcmdpbiBlcXVhbCB0byB0aGUgYm90dG9tIG1hcmdpbiBvZiB0aGUgbW9kYWxcbiAgaWYob2Zmc2V0IDwgYm90dG9tTWFyZ2luKSB7XG4gICAgb2Zmc2V0ID0gYm90dG9tTWFyZ2luO1xuICB9XG5cbiAgJGRpYWxvZy5jc3MoXCJtYXJnaW4tdG9wXCIsIG9mZnNldCk7XG4gIFxufSIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5HbG9iYWxzIC0gU2lkZWJhclxuXG4qL1xuXG5cbnZhciBtZWRpYVdpZHRoID0gcmVxdWlyZSgnLi4vdXRpbHMvbWVkaWEtd2lkdGgnKVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICAvLyBOYXZiYXIgVG9nZ2xlXG5cbiAgJChcIiNuYXZUcmlnZ2VyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQoXCJib2R5XCIpLnRvZ2dsZUNsYXNzKFwic2ItaXMtb3BlblwiKVxuICAgICQuZ2V0KCcvdXNlcnMvdG9nZ2xlU2lkZWJhcicpXG4gIH0pXG5cblxuIFxuICBjb25zb2xlLmxvZyhtZWRpYVdpZHRoKCkpO1xuXG4gIC8vIHRoaXMgaXNuJ3Qgd29ya2luZyAobm8gaWRlYSB3aHkpOlxuICAvLyBpZiAoIG1lZGlhV2lkdGgoKSA9PT0gXCJtb2JpbGVcIiApIFxuICAvLyBmb3Igbm93IGp1c3QgY2hlY2tpbmcgZm9yIGV4aXN0ZW5jZSBvZiBcbiAgLy8gdGhlIHZhcmlhYmxlLCBhcyBpdCBpcyBvbmx5IGN1cnJlbnRseSBzZXRcbiAgLy8gYXQgYmVsb3cgNzAwcHhcblxuICBpZiAoIG1lZGlhV2lkdGgoKSApIHtcbiAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcInNiLWlzLW9wZW5cIik7XG4gIH07XG5cbn0iLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuR2xvYmFsIFNjcmlwdHNcblxuKi9cblxuXG5cblxudmFyIGdsb2JhbEluaXRpYWxpemVycyA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5pbml0cycpXG5nbG9iYWxJbml0aWFsaXplcnMoKVxuXG52YXIgc2lkZWJhckluaXQgPSByZXF1aXJlKCcuL2dsb2JhbC9nbG9iYWwuc2lkZWJhcicpXG5zaWRlYmFySW5pdCgpXG5cbnZhciBnbG9iYWxNb2RhbHMgPSByZXF1aXJlKCcuL2dsb2JhbC9nbG9iYWwubW9kYWxzJylcbmdsb2JhbE1vZGFscygpXG5cbnZhciBiYXR0ZXJ5U3RhdHVzZXMgPSByZXF1aXJlKCcuL2dsb2JhbC9nbG9iYWwuYmF0LXN0YXRzJylcbmJhdHRlcnlTdGF0dXNlcygpIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aWR0aC1pbmRpY2F0b3InKSwgJzpiZWZvcmUnXG4gICkuZ2V0UHJvcGVydHlWYWx1ZSgnY29udGVudCcpXG59IFxuIl19
