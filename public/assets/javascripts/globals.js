(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){





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
},{}],3:[function(require,module,exports){
/* ---------------------------------------

Globals - Sidebar

*/




module.exports = function() {



  // Navbar Toggle

  // $(".nav-trigger").click(function() {
  $("#navTrigger").click(function() {
    $("body").toggleClass("sb-is-open")
    $.get('/users/toggleSidebar')
  })





  // Swipe To Toggle

  if ( $(!".minicolors").length > 0 )
  {
    $('body').on("swipeleft",function(){
      $(this).removeClass("sb-is-open")
    })
    $('body').on("swiperight",function(){
      $(this).addClass("sb-is-open")
    })
  }




}
},{}],4:[function(require,module,exports){
/* ---------------------------------------

Global Scripts

*/




var globalInitializers = require('./global/global.inits')
globalInitializers()

var sidebarInit = require('./global/global.sidebar')
sidebarInit()

var globalModals = require('./global/global.modals')
globalModals()
},{"./global/global.inits":1,"./global/global.modals":2,"./global/global.sidebar":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvZ2xvYmFsL2dsb2JhbC5pbml0cy5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWwvZ2xvYmFsLm1vZGFscy5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWwvZ2xvYmFsLnNpZGViYXIuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvZ2xvYmFscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuR2xvYmFscyAtIGluaXQgXG4oaW5pdGlhbGl6YWVycylcblxuKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG5cblxuICAvLyBJbml0IHNlbGVjdEJveFxuXG4gICQoJ3NlbGVjdCcpLnNlbGVjdEJveCh7J21vYmlsZSc6dHJ1ZX0pXG5cblxuXG5cbiAgLy8gVG9vbHRpcCBtZW51c1xuICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCh7aHRtbDogdHJ1ZX0pXG5cblxuXG5cbn0iLCJcblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICBcInVzZSBzdHJpY3RcIjtcblxuICAkKGRvY3VtZW50KS5vbignc2hvdy5icy5tb2RhbCcsICcubW9kYWwnLCBjZW50ZXJNb2RhbCk7XG5cblxuICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgICQoJy5tb2RhbDp2aXNpYmxlJykuZWFjaChjZW50ZXJNb2RhbCk7XG4gIH0pO1xuXG59XG5cblxuXG5cbi8qXG5cbkhlbHBlciBzY3JpcHRzIGZvciB0aGlzIG1vZHVsZVxuXG5Ob3Rlczpcbi0gaWYgYW55IG9mIHRoZXNlIG5lZWQgdG8gYmUgdXNlZCBpbiBvdGhlciBtb2R1bGVzLCBtb3ZlIHRoZW1cbiAgaW50byBhIGhlbHBlciBmaWxlICh0byB0aGVuIGJlIGltcG9ydGVkIGFuZCB1c2VkIGhlcmUpXG4qL1xuXG5cblxuZnVuY3Rpb24gY2VudGVyTW9kYWwoKSB7XG5cbiAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICB2YXIgJGRpYWxvZyAgICAgID0gJCh0aGlzKS5maW5kKFwiLm1vZGFsLWRpYWxvZ1wiKTtcbiAgdmFyIG9mZnNldCAgICAgICA9ICgkKHdpbmRvdykuaGVpZ2h0KCkgLSAkZGlhbG9nLmhlaWdodCgpKSAvIDI7XG4gIHZhciBib3R0b21NYXJnaW4gPSBwYXJzZUludCgkZGlhbG9nLmNzcygnbWFyZ2luQm90dG9tJyksIDEwKTtcblxuICAvLyBNYWtlIHN1cmUgeW91IGRvbid0IGhpZGUgdGhlIHRvcCBwYXJ0IG9mIHRoZSBtb2RhbCB3LyBhIG5lZ2F0aXZlIG1hcmdpbiBpZiBpdCdzIGxvbmdlciB0aGFuIHRoZSBzY3JlZW4gaGVpZ2h0LCBhbmQga2VlcCB0aGUgbWFyZ2luIGVxdWFsIHRvIHRoZSBib3R0b20gbWFyZ2luIG9mIHRoZSBtb2RhbFxuICBpZihvZmZzZXQgPCBib3R0b21NYXJnaW4pIHtcbiAgICBvZmZzZXQgPSBib3R0b21NYXJnaW47XG4gIH1cblxuICAkZGlhbG9nLmNzcyhcIm1hcmdpbi10b3BcIiwgb2Zmc2V0KTtcbiAgXG59IiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbkdsb2JhbHMgLSBTaWRlYmFyXG5cbiovXG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cblxuXG4gIC8vIE5hdmJhciBUb2dnbGVcblxuICAvLyAkKFwiLm5hdi10cmlnZ2VyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiI25hdlRyaWdnZXJcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJChcImJvZHlcIikudG9nZ2xlQ2xhc3MoXCJzYi1pcy1vcGVuXCIpXG4gICAgJC5nZXQoJy91c2Vycy90b2dnbGVTaWRlYmFyJylcbiAgfSlcblxuXG5cblxuXG4gIC8vIFN3aXBlIFRvIFRvZ2dsZVxuXG4gIGlmICggJCghXCIubWluaWNvbG9yc1wiKS5sZW5ndGggPiAwIClcbiAge1xuICAgICQoJ2JvZHknKS5vbihcInN3aXBlbGVmdFwiLGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2ItaXMtb3BlblwiKVxuICAgIH0pXG4gICAgJCgnYm9keScpLm9uKFwic3dpcGVyaWdodFwiLGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKFwic2ItaXMtb3BlblwiKVxuICAgIH0pXG4gIH1cblxuXG5cblxufSIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5HbG9iYWwgU2NyaXB0c1xuXG4qL1xuXG5cblxuXG52YXIgZ2xvYmFsSW5pdGlhbGl6ZXJzID0gcmVxdWlyZSgnLi9nbG9iYWwvZ2xvYmFsLmluaXRzJylcbmdsb2JhbEluaXRpYWxpemVycygpXG5cbnZhciBzaWRlYmFySW5pdCA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5zaWRlYmFyJylcbnNpZGViYXJJbml0KClcblxudmFyIGdsb2JhbE1vZGFscyA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5tb2RhbHMnKVxuZ2xvYmFsTW9kYWxzKCkiXX0=
