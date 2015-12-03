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