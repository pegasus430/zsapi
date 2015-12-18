
var entriesList = $('.overflow-more')



module.exports = function() {

  overflowMore()

}





overflowMore = function() {


  entriesList.each(function() {
    
    var td = $(this)


    var entryLimit = td.data('entry-limit')
    console.log(entryLimit)


    var entryArray = td.text().split(',')


    if ( entryArray.length > entryLimit ) {

      addMoreToggle(td, entryArray, entryLimit)

    }

  })
}



function addMoreToggle(td, entryArray, entryLimit) {

  var initial = entryArray.splice(0,entryLimit)
  

  // The remining elements of the entryArray are
  // those to show on 'show more'
  var more = entryArray


  // only show the initial text
  td.html(initial)

  // add 'read more' btn
  // td.append(', <span class="more" style="display:none">' + more + '</span> <a href="#" class="toggleMore pointer">[ show more ]</a>')
  $('<div/>', {
    class: 'more',

  }).appendTo(td)


  // Handle more show/hide
  // toggleMore(td)
  // td.find('.toggleMore').click(function() {
    // console.log('more!')
    // td.find('.more').toggle()
  // })

// return function(event) {
  handleToggle(td)
// }


}


var handleToggle = function(td) {
  $(document.body).click(function() {
    console.log(td)
  })

  td.find('.toggleMore').click(function() {
    console.log('more!')
    td.find('.more').toggle()
  })
}