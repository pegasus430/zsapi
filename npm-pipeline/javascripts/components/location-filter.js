/* ---------------------------------------

Location Filter Logic (dropdowns)

Notes: 

- To activate, add to HTML:

1.  id="locationFilter" 
    to an element wrapping the select dropdown 

2.  data-url-pattern="/locations/id/campaigns/<%= @campaign[:id] %>"
    where the value of the data-url-pattern attribute is the desired
    url pattern. 
    IMPORTANT: "id" in the value will be dynamically replaced with 
    the selected value's id

*/







module.exports = function() {

  updateUrl()

}




updateUrl = function() {

  // Get the url pattern

  var urlPattern = $('#locationFilter').data('url-pattern')


  // Listen for location selections
  // and perform necessary logic

  $('#locationFilter select').selectBox().change(function () {

      // Get the id of the selected location 

      var targetID = $(this).val()
    

      // Replace the 'id' in teh urlPattern with the 
      // selected location's id, 
      // Leving us with the url to go to

      var stringToReplace = /id/i
      var goToURL = urlPattern.replace( stringToReplace, targetID )

      console.log(urlPattern)
      console.log(goToURL)

      
      // navigate the window to the new url

      window.location = goToURL

  })

}