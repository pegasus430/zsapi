(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* ---------------------------------------

Location Filter Logic (dropdowns)

Notes: 

- There's a plugin being used for the selectboxes that necessitates
  a call to their method for the change event to work
  See more on this on their Github readme: 
  https://github.com/marcj/jquery-selectBox

*/



module.exports = function() {


  // Listen for location selections
  // and perform necessary logic
  
  // #locationFilter present on the select element
  var locationFilter = $('#locationFilter')

  if ( locationFilter !== undefined || locationFilter !== null ) {

    $('#locationFilter').selectBox().change(function () {

        // Get the id of the selected location 

        var targetURL = $(this).val()

        
        // navigate the window to the new url

        window.location = targetURL

    })
  }

  
  // Update current location selection

  var currentRelURL = window.location.pathname
  var currentValue
  
  $('#locationFilter > option').each(function() {
    var currentValue = $(this).val()
    if ( currentRelURL === currentValue ) {
      $('#locationFilter').selectBox('value', currentValue)
    }
  })

}
},{}],2:[function(require,module,exports){
/*

s-pages


Notes:
- a per-controller-specific file
- included on the Dashboard

*/




// Listen for changes on the location filter dropdown
// and redirect the window appropriately

var locationFilter = require('./components/location-filter') 
locationFilter()




// var masonryLayout = require('./components/dash-masonry')
// masonryLayout()
},{"./components/location-filter":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy9sb2NhdGlvbi1maWx0ZXIuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvcy1wYWdlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbkxvY2F0aW9uIEZpbHRlciBMb2dpYyAoZHJvcGRvd25zKVxuXG5Ob3RlczogXG5cbi0gVGhlcmUncyBhIHBsdWdpbiBiZWluZyB1c2VkIGZvciB0aGUgc2VsZWN0Ym94ZXMgdGhhdCBuZWNlc3NpdGF0ZXNcbiAgYSBjYWxsIHRvIHRoZWlyIG1ldGhvZCBmb3IgdGhlIGNoYW5nZSBldmVudCB0byB3b3JrXG4gIFNlZSBtb3JlIG9uIHRoaXMgb24gdGhlaXIgR2l0aHViIHJlYWRtZTogXG4gIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJjai9qcXVlcnktc2VsZWN0Qm94XG5cbiovXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG5cbiAgLy8gTGlzdGVuIGZvciBsb2NhdGlvbiBzZWxlY3Rpb25zXG4gIC8vIGFuZCBwZXJmb3JtIG5lY2Vzc2FyeSBsb2dpY1xuICBcbiAgLy8gI2xvY2F0aW9uRmlsdGVyIHByZXNlbnQgb24gdGhlIHNlbGVjdCBlbGVtZW50XG4gIHZhciBsb2NhdGlvbkZpbHRlciA9ICQoJyNsb2NhdGlvbkZpbHRlcicpXG5cbiAgaWYgKCBsb2NhdGlvbkZpbHRlciAhPT0gdW5kZWZpbmVkIHx8IGxvY2F0aW9uRmlsdGVyICE9PSBudWxsICkge1xuXG4gICAgJCgnI2xvY2F0aW9uRmlsdGVyJykuc2VsZWN0Qm94KCkuY2hhbmdlKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAvLyBHZXQgdGhlIGlkIG9mIHRoZSBzZWxlY3RlZCBsb2NhdGlvbiBcblxuICAgICAgICB2YXIgdGFyZ2V0VVJMID0gJCh0aGlzKS52YWwoKVxuXG4gICAgICAgIFxuICAgICAgICAvLyBuYXZpZ2F0ZSB0aGUgd2luZG93IHRvIHRoZSBuZXcgdXJsXG5cbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gdGFyZ2V0VVJMXG5cbiAgICB9KVxuICB9XG5cbiAgXG4gIC8vIFVwZGF0ZSBjdXJyZW50IGxvY2F0aW9uIHNlbGVjdGlvblxuXG4gIHZhciBjdXJyZW50UmVsVVJMID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXG4gIHZhciBjdXJyZW50VmFsdWVcbiAgXG4gICQoJyNsb2NhdGlvbkZpbHRlciA+IG9wdGlvbicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJlbnRWYWx1ZSA9ICQodGhpcykudmFsKClcbiAgICBpZiAoIGN1cnJlbnRSZWxVUkwgPT09IGN1cnJlbnRWYWx1ZSApIHtcbiAgICAgICQoJyNsb2NhdGlvbkZpbHRlcicpLnNlbGVjdEJveCgndmFsdWUnLCBjdXJyZW50VmFsdWUpXG4gICAgfVxuICB9KVxuXG59IiwiLypcblxucy1wYWdlc1xuXG5cbk5vdGVzOlxuLSBhIHBlci1jb250cm9sbGVyLXNwZWNpZmljIGZpbGVcbi0gaW5jbHVkZWQgb24gdGhlIERhc2hib2FyZFxuXG4qL1xuXG5cblxuXG4vLyBMaXN0ZW4gZm9yIGNoYW5nZXMgb24gdGhlIGxvY2F0aW9uIGZpbHRlciBkcm9wZG93blxuLy8gYW5kIHJlZGlyZWN0IHRoZSB3aW5kb3cgYXBwcm9wcmlhdGVseVxuXG52YXIgbG9jYXRpb25GaWx0ZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9jYXRpb24tZmlsdGVyJykgXG5sb2NhdGlvbkZpbHRlcigpXG5cblxuXG5cbi8vIHZhciBtYXNvbnJ5TGF5b3V0ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2Rhc2gtbWFzb25yeScpXG4vLyBtYXNvbnJ5TGF5b3V0KCkiXX0=
