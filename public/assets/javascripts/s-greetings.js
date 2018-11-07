(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

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
},{}],2:[function(require,module,exports){
// Limit the number of locations displayed by default in tables...
// add a simple show more / less 

var listOverflowMore = require('./components/list-overflow-more');
listOverflowMore();

},{"./components/list-overflow-more":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy9saXN0LW92ZXJmbG93LW1vcmUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvcy1ncmVldGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG52YXIgZW50cmllc0xpc3QgPSAkKCcub3ZlcmZsb3ctbW9yZScpXG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKCBlbnRyaWVzTGlzdCAhPT0gdW5kZWZpbmVkIHx8IGVudHJpZXNMaXN0ICE9PSBudWxsICkgeyBcblxuICAgIHZhciBpbmRleCA9IDAgXG5cbiAgICBlbnRyaWVzTGlzdC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRkID0gJCh0aGlzKVxuICAgICAgaW5kZXgrK1xuICAgICAgXG5cbiAgICAgIHZhciBlbnRyeUxpbWl0ID0gdGQuZGF0YSgnZW50cnktbGltaXQnKVxuICAgICAgdmFyIGVudHJ5QXJyYXkgPSB0ZC50ZXh0KCkuc3BsaXQoJywnKVxuXG5cbiAgICAgIGlmICggZW50cnlBcnJheS5sZW5ndGggPiBlbnRyeUxpbWl0ICkge1xuXG5cbiAgICAgICAgaGFuZGxlRE9NKHRkLCBlbnRyeUFycmF5LCBlbnRyeUxpbWl0LCBpbmRleCk7XG4gICAgIFxuXG4gICAgICB9XG5cbiAgICB9KVxuICB9IC8vIGVuZCBpZlxuXG59XG5cblxuXG5cblxuXG5mdW5jdGlvbiBoYW5kbGVET00odGQsIGVudHJ5QXJyYXksIGVudHJ5TGltaXQsIGluZGV4KSB7XG5cbiAgdmFyIGluaXRpYWwgPSBlbnRyeUFycmF5LnNwbGljZSgwLGVudHJ5TGltaXQpXG4gIFxuXG4gIC8vIFRoZSByZW1pbmluZyBlbGVtZW50cyBvZiB0aGUgZW50cnlBcnJheSBhcmVcbiAgLy8gdGhvc2UgdG8gc2hvdyBvbiAnc2hvdyBtb3JlJ1xuICB2YXIgbW9yZSA9IGVudHJ5QXJyYXlcblxuXG4gIC8vIG9ubHkgc2hvdyB0aGUgaW5pdGlhbCB0ZXh0XG4gIHRkLnRleHQoaW5pdGlhbClcblxuXG4gIC8vIGFkZCBiYWNrIGxhc3QgY29tbWEgdG8gb3ZlcmZsb3cgbG9jYXRpb25zXG4gIHZhciBjb250ZW50ID0gJywnICsgbW9yZVxuXG5cbiAgLy8gYWRkIGhpZGRlbiBkaXYgKHdpdGggcmVtYWluaW5nIGxvY2F0aW9ucylcbiAgdGQuYXBwZW5kKFxuICAgICQoJzxzcGFuLz4nKVxuICAgICAgLmFkZENsYXNzKCdtb3JlJylcbiAgICAgIC5hdHRyKCdpZCcsICdtb3JlLScraW5kZXgpXG4gICAgICAuYXR0cignc3R5bGUnLCAnZGlzcGxheTogbm9uZTsnKVxuICAgICAgLmFwcGVuZChcIjxzcGFuLz5cIilcbiAgICAgICAgLnRleHQoY29udGVudClcbiAgKVxuXG5cbiAgLy8gYWRkIHRvZ2dsZSBlbGVtZW50XG4gIHRkLmFwcGVuZChcbiAgICAkKFwiPHNwYW4vPlwiKVxuICAgICAgLmFkZENsYXNzKCd0b2dnbGVNb3JlIGlubGluZS1ibG9jayBtbDIgcG9pbnRlcicpXG4gICAgICAuYXR0cignaWQnLCAndG9nZ2xlTW9yZS0nK2luZGV4KVxuICAgICAgLnRleHQoJ1sgU2hvdyBNb3JlIF0nKVxuICApXG5cblxuICAvLyBoYW5kbGUgdG9nZ2xlIGxvZ2ljXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICgnI3RvZ2dsZU1vcmUtJytpbmRleCksIGZ1bmN0aW9uKCkge1xuICAgIGhhbmRsZVRvZ2dsZShpbmRleClcbiAgfSkgIFxuXG59XG5cblxuXG5mdW5jdGlvbiBoYW5kbGVUb2dnbGUoaW5kZXgpIHtcbiAgXG4gIHZhciBidG4gPSAkKCcjdG9nZ2xlTW9yZS0nK2luZGV4KVxuICB2YXIgdGFyZ2V0ID0gJCgnI21vcmUtJytpbmRleClcblxuICB0YXJnZXQudG9nZ2xlKClcbiAgdGFyZ2V0LnRvZ2dsZUNsYXNzKCdvcGVuJylcblxuICBpZiAoIHRhcmdldC5oYXNDbGFzcygnb3BlbicpICkge1xuXG4gICAgYnRuLnRleHQoJ1sgU2hvdyBMZXNzIF0nKVxuXG4gIH0gZWxzZSB7XG5cbiAgICBidG4udGV4dCgnWyBTaG93IE1vcmUgXScpXG4gIH1cbn0iLCIvLyBMaW1pdCB0aGUgbnVtYmVyIG9mIGxvY2F0aW9ucyBkaXNwbGF5ZWQgYnkgZGVmYXVsdCBpbiB0YWJsZXMuLi5cbi8vIGFkZCBhIHNpbXBsZSBzaG93IG1vcmUgLyBsZXNzIFxuXG52YXIgbGlzdE92ZXJmbG93TW9yZSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9saXN0LW92ZXJmbG93LW1vcmUnKTtcbmxpc3RPdmVyZmxvd01vcmUoKTtcbiJdfQ==
