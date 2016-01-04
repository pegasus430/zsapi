/* ---------------------------------------

Location filters

Notes: 

- There's a plugin being used for the selectboxes that necessitates
  a call to their method for the change event to work
  See more on this on their Github readme: 
  https://github.com/marcj/jquery-selectBox

*/





module.exports = function() {


  var filterStatus = $('#campaignFilter-status')
  var filterType   = $('#campaignFilter-type')


  var urlObject = {
    type: '',
    status: ''
  };

  function updateURL() {
   
    return Object.keys(urlObject).map(function(k) {
      return encodeURIComponent(urlObject[k])
    }).join('/')    

  }

  
  /*
  URI Pattern = campaigns/:type/:status
  */


  if ( filterStatus !== undefined || filterStatus !== null ) {

    filterStatus.selectBox().change(function() {

      urlObject.status = $(this).val().toLowerCase()
      
      console.log(updateURL())
      console.log(window.location)
      // window.location.pathname = 'campaigns/' + updateURL()

    })


  }

  if ( filterType !== undefined || filterType !== null ) {

    filterType.selectBox().change(function() {

      urlObject.type = $(this).val().toLowerCase()

      console.log(updateURL())
      console.log(window.location)
      // window.location.pathname = 'campaigns/' + updateURL()

    })


  }


}