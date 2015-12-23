(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var entriesList = $('.overflow-more')



module.exports = function() {

  overflowMore()

}





overflowMore = function() {

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
},{}],2:[function(require,module,exports){
// Limit the number of locations displayed by default in tables...
// add a simple show more / less 

var listOverflowMore = require('./components/list-overflow-more');
listOverflowMore();

},{"./components/list-overflow-more":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy9saXN0LW92ZXJmbG93LW1vcmUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvcy1ncmVldGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxudmFyIGVudHJpZXNMaXN0ID0gJCgnLm92ZXJmbG93LW1vcmUnKVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICBvdmVyZmxvd01vcmUoKVxuXG59XG5cblxuXG5cblxub3ZlcmZsb3dNb3JlID0gZnVuY3Rpb24oKSB7XG5cbiAgdmFyIGluZGV4ID0gMCBcblxuICBlbnRyaWVzTGlzdC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciB0ZCA9ICQodGhpcylcbiAgICBpbmRleCsrXG4gICAgXG5cbiAgICB2YXIgZW50cnlMaW1pdCA9IHRkLmRhdGEoJ2VudHJ5LWxpbWl0JylcbiAgICB2YXIgZW50cnlBcnJheSA9IHRkLnRleHQoKS5zcGxpdCgnLCcpXG5cblxuICAgIGlmICggZW50cnlBcnJheS5sZW5ndGggPiBlbnRyeUxpbWl0ICkge1xuXG5cbiAgICAgIGhhbmRsZURPTSh0ZCwgZW50cnlBcnJheSwgZW50cnlMaW1pdCwgaW5kZXgpO1xuICAgXG5cbiAgICB9XG5cbiAgfSlcblxufVxuXG5cblxuZnVuY3Rpb24gaGFuZGxlRE9NKHRkLCBlbnRyeUFycmF5LCBlbnRyeUxpbWl0LCBpbmRleCkge1xuXG4gIHZhciBpbml0aWFsID0gZW50cnlBcnJheS5zcGxpY2UoMCxlbnRyeUxpbWl0KVxuICBcblxuICAvLyBUaGUgcmVtaW5pbmcgZWxlbWVudHMgb2YgdGhlIGVudHJ5QXJyYXkgYXJlXG4gIC8vIHRob3NlIHRvIHNob3cgb24gJ3Nob3cgbW9yZSdcbiAgdmFyIG1vcmUgPSBlbnRyeUFycmF5XG5cblxuICAvLyBvbmx5IHNob3cgdGhlIGluaXRpYWwgdGV4dFxuICB0ZC50ZXh0KGluaXRpYWwpXG5cblxuICAvLyBhZGQgYmFjayBsYXN0IGNvbW1hIHRvIG92ZXJmbG93IGxvY2F0aW9uc1xuICB2YXIgY29udGVudCA9ICcsJyArIG1vcmVcblxuXG4gIC8vIGFkZCBoaWRkZW4gZGl2ICh3aXRoIHJlbWFpbmluZyBsb2NhdGlvbnMpXG4gIHRkLmFwcGVuZChcbiAgICAkKCc8c3Bhbi8+JylcbiAgICAgIC5hZGRDbGFzcygnbW9yZScpXG4gICAgICAuYXR0cignaWQnLCAnbW9yZS0nK2luZGV4KVxuICAgICAgLmF0dHIoJ3N0eWxlJywgJ2Rpc3BsYXk6IG5vbmU7JylcbiAgICAgIC5hcHBlbmQoXCI8c3Bhbi8+XCIpXG4gICAgICAgIC50ZXh0KGNvbnRlbnQpXG4gIClcblxuXG4gIC8vIGFkZCB0b2dnbGUgZWxlbWVudFxuICB0ZC5hcHBlbmQoXG4gICAgJChcIjxzcGFuLz5cIilcbiAgICAgIC5hZGRDbGFzcygndG9nZ2xlTW9yZSBpbmxpbmUtYmxvY2sgbWwyIHBvaW50ZXInKVxuICAgICAgLmF0dHIoJ2lkJywgJ3RvZ2dsZU1vcmUtJytpbmRleClcbiAgICAgIC50ZXh0KCdbIFNob3cgTW9yZSBdJylcbiAgKVxuXG5cbiAgLy8gaGFuZGxlIHRvZ2dsZSBsb2dpY1xuICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAoJyN0b2dnbGVNb3JlLScraW5kZXgpLCBmdW5jdGlvbigpIHtcbiAgICBoYW5kbGVUb2dnbGUoaW5kZXgpXG4gIH0pICBcblxufVxuXG5cblxuZnVuY3Rpb24gaGFuZGxlVG9nZ2xlKGluZGV4KSB7XG4gIFxuICB2YXIgYnRuID0gJCgnI3RvZ2dsZU1vcmUtJytpbmRleClcbiAgdmFyIHRhcmdldCA9ICQoJyNtb3JlLScraW5kZXgpXG5cbiAgdGFyZ2V0LnRvZ2dsZSgpXG4gIHRhcmdldC50b2dnbGVDbGFzcygnb3BlbicpXG5cbiAgaWYgKCB0YXJnZXQuaGFzQ2xhc3MoJ29wZW4nKSApIHtcblxuICAgIGJ0bi50ZXh0KCdbIFNob3cgTGVzcyBdJylcblxuICB9IGVsc2Uge1xuXG4gICAgYnRuLnRleHQoJ1sgU2hvdyBNb3JlIF0nKVxuICB9XG59IiwiLy8gTGltaXQgdGhlIG51bWJlciBvZiBsb2NhdGlvbnMgZGlzcGxheWVkIGJ5IGRlZmF1bHQgaW4gdGFibGVzLi4uXG4vLyBhZGQgYSBzaW1wbGUgc2hvdyBtb3JlIC8gbGVzcyBcblxudmFyIGxpc3RPdmVyZmxvd01vcmUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbGlzdC1vdmVyZmxvdy1tb3JlJyk7XG5saXN0T3ZlcmZsb3dNb3JlKCk7XG4iXX0=
