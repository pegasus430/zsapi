/* ---------------------------------------

Location filters

Notes: 

- There's a plugin being used for the selectboxes that necessitates
  a call to their method for the change event to work
  See more on this on their Github readme: 
  https://github.com/marcj/jquery-selectBox

*/





module.exports = function() {

  // Get the two filters

  var filterStatus = $('#campaignFilter-status')
  var filterType   = $('#campaignFilter-type')

  
  // Get each of their values,
  // lowercasing only if there's a value, otherwise
  // they'll be a runtime error
  // Wes: Added try block to prevent errors on pages with no element
  try {
    var initialStatus = $('#campaignFilter-status :selected').val()
    if ( initialStatus !== undefined && initialStatus.length ) 
      initialStatus = initialStatus.toLowerCase()

    var initialType = $('#campaignFilter-type :selected').val()
    if ( initialType !== undefined && initialType.length ) 
      initialType = initialType.toLowerCase()
  }
  catch(err){
    console.log(err);
  }

  // Set their values in an object

  var urlObject = {
    type: initialType,
    status: initialStatus
  };


  // Helper function for updating the url on change of filter value

  function updateURL() {
   
    return Object.keys(urlObject).map(function(k) {
      return encodeURIComponent(urlObject[k])
    }).join('/')

  }

  
  /*
  Update url on filter
  URI Pattern: campaigns/:type/:status
  */


  // Status filter

  if ( filterStatus !== undefined || filterStatus !== null ) {

    filterStatus.selectBox().change(function() {

      // Update the status property

      urlObject.status = $(this).val().toLowerCase()
      
      // Update the url

      window.location.pathname = 'campaigns/' + updateURL()

    })
  }


  // Type filter

  if ( filterType !== undefined || filterType !== null ) {

    filterType.selectBox().change(function() {

      // Update the type propery 

      urlObject.type = $(this).val().toLowerCase()


      // Update the url 

      window.location.pathname = 'campaigns/' + updateURL()

    })
  }


}