/* ---------------------------------------

Globals - init 
(initializaers)

*/


module.exports = function() {



  // Init selectBox

  $('select').selectBox({'mobile':true})





  // Navbar Collapsing

  $(".nav-trigger").click(function() {
    $("body").toggleClass("active-sidebar")
    $.get('/users/toggleSidebar')
  })





  // Swipe to open menu

  if ( $(!".minicolors").length > 0 )
  {
    $('body').on("swipeleft",function(){
      $(this).removeClass("active-sidebar")
    })
    $('body').on("swiperight",function(){
      $(this).addClass("active-sidebar")
    })
  }





  // Tooltip menus
  $('[data-toggle="tooltip"]').tooltip({html: true})




} // end export function