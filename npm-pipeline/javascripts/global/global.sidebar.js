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





  // Swipe Toggle

  $(function() {
    $("body").swipe( {

      swipe:function(event, direction) {

        // Close on swipe left
        if ( direction === 'left' ) {

          $("body").removeClass('sb-is-open')



        // Open on swipe right
        } else if ( direction === 'right' ) {

          $("body").addClass('sb-is-open')

        }
      }
    })

  });



}