/* ---------------------------------------

Globals - init 
(initializaers)

*/


module.exports = function() {



  // Init selectBox

  $('select').selectBox({'mobile':true})





  // Navbar Collapsing

  // $(".nav-trigger").click(function() {
  $("#navTrigger").click(function() {
    $("body").toggleClass("sb-is-open")
    $.get('/users/toggleSidebar')
  })





  // Swipe to open menu

  if ( $(!".minicolors").length > 0 )
  {
    $('body').on("swipeleft",function(){
      $(this).removeClass("sb-is-open")
    })
    $('body').on("swiperight",function(){
      $(this).addClass("sb-is-open")
    })
  }





  // Tooltip menus
  $('[data-toggle="tooltip"]').tooltip({html: true})




} // end export function