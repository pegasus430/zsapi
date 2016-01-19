/* ---------------------------------------

Globals - Sidebar

*/


module.exports = function() {

  // Navbar Toggle

  $("#navTrigger").click(function() {
    $("body").toggleClass("sb-is-open")
    $.get('/users/toggleSidebar')
  })

}