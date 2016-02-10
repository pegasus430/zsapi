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