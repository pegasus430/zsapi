






module.exports = function() {

  overflowMore()

}





overflowMore = function() {

  var entriesList = $('.overflow-more')

  entriesList.each(function() {

    var entryLimit = $('this').data('entry-limit')
    console.log(entryLimit)


    var array = $(this).text().split(',')

    // console.log(array)
    // console.log(array.length)

    if ( array.length > entryLimit ) {
      console.log('more!')
    }


  })

  
}