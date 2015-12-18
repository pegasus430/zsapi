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
- There's a plugin being used for the selectboxes that necessitates
  a call to their method for the change event to work
  See more on this on their Github readme: 
  https://github.com/marcj/jquery-selectBox

*/







module.exports = function() {

  updateUrl()

}




updateUrl = function() {

  // The core div with the necessary id and data attributes

  var filterWrap = $('#locationFilter')
  

  // Get the url pattern

  var urlPattern = filterWrap.data('url-pattern')


  // Listen for location selections
  // and perform necessary logic

  $('#locationFilter select').selectBox().change(function () {

      // Get the id of the selected location 

      var targetID = $(this).val()
    
      // Account for selection of "+ New Location"

      if ( targetID === '0' ) {
      
        var goToURL = filterWrap.data('new-location')

      } else {

        // Replace the 'id' in teh urlPattern with the 
        // selected location's id, 
        // Leving us with the url to go to

        var stringToReplace = /id/i
        var goToURL = urlPattern.replace( stringToReplace, targetID )
      }

      console.log(goToURL)

      
      // navigate the window to the new url

      window.location = goToURL

  })

}