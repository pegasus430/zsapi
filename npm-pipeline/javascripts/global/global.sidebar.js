/* ---------------------------------------

Globals - Sidebar

*/


var swipe = require('jquery-touchswipe')


module.exports = function() {



  // Navbar Toggle

  // $(".nav-trigger").click(function() {
  $("#navTrigger").click(function() {
    $("body").toggleClass("sb-is-open")
    $.get('/users/toggleSidebar')
  })




  // Swipe menu implementation causing no-scroll bug, 
  // due to bug with jquery-touchswipe
  // commenting out for now, as menu toggle is fully
  // functional via the toggle button

  // Swipe Toggle

  // $(function() {
  //   $(".swipe-area").swipe( {
  //     swipe:function(event, direction) {
  //       // Open on swipe right
  //       if ( direction === 'right' ) {
  //         $("body").addClass('sb-is-open')
  //       }
  //     },
  //     preventDefaultEvents: false
  //   })

  // });

  // $(function() {
  //   $("body").swipe({
  //     swipe:function(event, direction) {
  //       if ( direction === 'left' ) {
  //         // Close on swipe left
  //         $("body").removeClass('sb-is-open')
  //       }
  //     },
  //     preventDefaultEvents: false
  //   })
  // })





}