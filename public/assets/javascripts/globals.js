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

Applications.js

*/



// Assets
//= require jquery
//= require jquery_ujs
//= require jquery.mobile.custom

// Gem
//= require twitter/bootstrap

// Vendor
//= require select/jquery.selectBox
//= require bootstrap-table
//= require hopscotch/hopscotch

//= require turbolinks
//= require_self




var globalInitializers = require('./global/global.inits')
globalInitializers()

var sidebarInit = require('./global/global.sidebar')
sidebarInit()

var globalModals = require('./global/global.modals')
globalModals()
},{"./global/global.inits":1,"./global/global.modals":2,"./global/global.sidebar":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL2dsb2JhbC9nbG9iYWwuaW5pdHMuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvZ2xvYmFsL2dsb2JhbC5tb2RhbHMuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvZ2xvYmFsL2dsb2JhbC5zaWRlYmFyLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL2dsb2JhbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbkdsb2JhbHMgLSBpbml0IFxuKGluaXRpYWxpemFlcnMpXG5cbiovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuXG5cbiAgLy8gSW5pdCBzZWxlY3RCb3hcblxuICAkKCdzZWxlY3QnKS5zZWxlY3RCb3goeydtb2JpbGUnOnRydWV9KVxuXG5cblxuXG4gIC8vIFRvb2x0aXAgbWVudXNcbiAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe2h0bWw6IHRydWV9KVxuXG5cblxuXG59IiwiXG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgJChkb2N1bWVudCkub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgY2VudGVyTW9kYWwpO1xuXG5cbiAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCcubW9kYWw6dmlzaWJsZScpLmVhY2goY2VudGVyTW9kYWwpO1xuICB9KTtcblxufVxuXG5cblxuXG4vKlxuXG5IZWxwZXIgc2NyaXB0cyBmb3IgdGhpcyBtb2R1bGVcblxuTm90ZXM6XG4tIGlmIGFueSBvZiB0aGVzZSBuZWVkIHRvIGJlIHVzZWQgaW4gb3RoZXIgbW9kdWxlcywgbW92ZSB0aGVtXG4gIGludG8gYSBoZWxwZXIgZmlsZSAodG8gdGhlbiBiZSBpbXBvcnRlZCBhbmQgdXNlZCBoZXJlKVxuKi9cblxuXG5cbmZ1bmN0aW9uIGNlbnRlck1vZGFsKCkge1xuXG4gICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgdmFyICRkaWFsb2cgICAgICA9ICQodGhpcykuZmluZChcIi5tb2RhbC1kaWFsb2dcIik7XG4gIHZhciBvZmZzZXQgICAgICAgPSAoJCh3aW5kb3cpLmhlaWdodCgpIC0gJGRpYWxvZy5oZWlnaHQoKSkgLyAyO1xuICB2YXIgYm90dG9tTWFyZ2luID0gcGFyc2VJbnQoJGRpYWxvZy5jc3MoJ21hcmdpbkJvdHRvbScpLCAxMCk7XG5cbiAgLy8gTWFrZSBzdXJlIHlvdSBkb24ndCBoaWRlIHRoZSB0b3AgcGFydCBvZiB0aGUgbW9kYWwgdy8gYSBuZWdhdGl2ZSBtYXJnaW4gaWYgaXQncyBsb25nZXIgdGhhbiB0aGUgc2NyZWVuIGhlaWdodCwgYW5kIGtlZXAgdGhlIG1hcmdpbiBlcXVhbCB0byB0aGUgYm90dG9tIG1hcmdpbiBvZiB0aGUgbW9kYWxcbiAgaWYob2Zmc2V0IDwgYm90dG9tTWFyZ2luKSB7XG4gICAgb2Zmc2V0ID0gYm90dG9tTWFyZ2luO1xuICB9XG5cbiAgJGRpYWxvZy5jc3MoXCJtYXJnaW4tdG9wXCIsIG9mZnNldCk7XG4gIFxufSIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5HbG9iYWxzIC0gU2lkZWJhclxuXG4qL1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG5cblxuICAvLyBOYXZiYXIgVG9nZ2xlXG5cbiAgLy8gJChcIi5uYXYtdHJpZ2dlclwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIiNuYXZUcmlnZ2VyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQoXCJib2R5XCIpLnRvZ2dsZUNsYXNzKFwic2ItaXMtb3BlblwiKVxuICAgICQuZ2V0KCcvdXNlcnMvdG9nZ2xlU2lkZWJhcicpXG4gIH0pXG5cblxuXG5cblxuICAvLyBTd2lwZSBUbyBUb2dnbGVcblxuICBpZiAoICQoIVwiLm1pbmljb2xvcnNcIikubGVuZ3RoID4gMCApXG4gIHtcbiAgICAkKCdib2R5Jykub24oXCJzd2lwZWxlZnRcIixmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcInNiLWlzLW9wZW5cIilcbiAgICB9KVxuICAgICQoJ2JvZHknKS5vbihcInN3aXBlcmlnaHRcIixmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInNiLWlzLW9wZW5cIilcbiAgICB9KVxuICB9XG5cblxuXG5cbn0iLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuQXBwbGljYXRpb25zLmpzXG5cbiovXG5cblxuXG4vLyBBc3NldHNcbi8vPSByZXF1aXJlIGpxdWVyeVxuLy89IHJlcXVpcmUganF1ZXJ5X3Vqc1xuLy89IHJlcXVpcmUganF1ZXJ5Lm1vYmlsZS5jdXN0b21cblxuLy8gR2VtXG4vLz0gcmVxdWlyZSB0d2l0dGVyL2Jvb3RzdHJhcFxuXG4vLyBWZW5kb3Jcbi8vPSByZXF1aXJlIHNlbGVjdC9qcXVlcnkuc2VsZWN0Qm94XG4vLz0gcmVxdWlyZSBib290c3RyYXAtdGFibGVcbi8vPSByZXF1aXJlIGhvcHNjb3RjaC9ob3BzY290Y2hcblxuLy89IHJlcXVpcmUgdHVyYm9saW5rc1xuLy89IHJlcXVpcmVfc2VsZlxuXG5cblxuXG52YXIgZ2xvYmFsSW5pdGlhbGl6ZXJzID0gcmVxdWlyZSgnLi9nbG9iYWwvZ2xvYmFsLmluaXRzJylcbmdsb2JhbEluaXRpYWxpemVycygpXG5cbnZhciBzaWRlYmFySW5pdCA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5zaWRlYmFyJylcbnNpZGViYXJJbml0KClcblxudmFyIGdsb2JhbE1vZGFscyA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5tb2RhbHMnKVxuZ2xvYmFsTW9kYWxzKCkiXX0=
