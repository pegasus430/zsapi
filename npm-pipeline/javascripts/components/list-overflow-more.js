
var entriesList = $('.overflow-more')




module.exports = function() {

  if ( entriesList !== undefined || entriesList !== null ) { 

    var index = 0 

    entriesList.each(function() {
      var td = $(this)
      index++
      

      var entryLimit = td.data('entry-limit')
      var entryArray = td.text().split(',')


      if ( entryArray.length > entryLimit ) {


        handleDOM(td, entryArray, entryLimit, index);
     

      }

    })
  } // end if

}






function handleDOM(td, entryArray, entryLimit, index) {

  var initial = entryArray.splice(0,entryLimit)
  

  // The remining elements of the entryArray are
  // those to show on 'show more'
  var more = entryArray


  // only show the initial text
  td.text(initial)


  // add back last comma to overflow locations
  var content = ',' + more


  // add hidden div (with remaining locations)
  td.append(
    $('<span/>')
      .addClass('more')
      .attr('id', 'more-'+index)
      .attr('style', 'display: none;')
      .append("<span/>")
        .text(content)
  )


  // add toggle element
  td.append(
    $("<span/>")
      .addClass('toggleMore inline-block ml2 pointer')
      .attr('id', 'toggleMore-'+index)
      .text('[ Show More ]')
  )


  // handle toggle logic
  $(document).on('click', ('#toggleMore-'+index), function() {
    handleToggle(index)
  })  

}



function handleToggle(index) {
  
  var btn = $('#toggleMore-'+index)
  var target = $('#more-'+index)

  target.toggle()
  target.toggleClass('open')

  if ( target.hasClass('open') ) {

    btn.text('[ Show Less ]')

  } else {

    btn.text('[ Show More ]')
  }
}