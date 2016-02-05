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
Listen for changes on the location filter dropdown
and redirect the window appropriately
*/

var locationFilter = require('./components/location-filter')
locationFilter()
},{"./components/location-filter":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy9sb2NhdGlvbi1maWx0ZXIuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvcy1yZWNlaXB0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuTG9jYXRpb24gRmlsdGVyIExvZ2ljIChkcm9wZG93bnMpXG5cbk5vdGVzOiBcblxuLSBUaGVyZSdzIGEgcGx1Z2luIGJlaW5nIHVzZWQgZm9yIHRoZSBzZWxlY3Rib3hlcyB0aGF0IG5lY2Vzc2l0YXRlc1xuICBhIGNhbGwgdG8gdGhlaXIgbWV0aG9kIGZvciB0aGUgY2hhbmdlIGV2ZW50IHRvIHdvcmtcbiAgU2VlIG1vcmUgb24gdGhpcyBvbiB0aGVpciBHaXRodWIgcmVhZG1lOiBcbiAgaHR0cHM6Ly9naXRodWIuY29tL21hcmNqL2pxdWVyeS1zZWxlY3RCb3hcblxuKi9cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cblxuICAvLyBMaXN0ZW4gZm9yIGxvY2F0aW9uIHNlbGVjdGlvbnNcbiAgLy8gYW5kIHBlcmZvcm0gbmVjZXNzYXJ5IGxvZ2ljXG4gIFxuICAvLyAjbG9jYXRpb25GaWx0ZXIgcHJlc2VudCBvbiB0aGUgc2VsZWN0IGVsZW1lbnRcbiAgdmFyIGxvY2F0aW9uRmlsdGVyID0gJCgnI2xvY2F0aW9uRmlsdGVyJylcblxuICBpZiAoIGxvY2F0aW9uRmlsdGVyICE9PSB1bmRlZmluZWQgfHwgbG9jYXRpb25GaWx0ZXIgIT09IG51bGwgKSB7XG5cbiAgICAkKCcjbG9jYXRpb25GaWx0ZXInKS5zZWxlY3RCb3goKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8vIEdldCB0aGUgaWQgb2YgdGhlIHNlbGVjdGVkIGxvY2F0aW9uIFxuXG4gICAgICAgIHZhciB0YXJnZXRVUkwgPSAkKHRoaXMpLnZhbCgpXG5cbiAgICAgICAgXG4gICAgICAgIC8vIG5hdmlnYXRlIHRoZSB3aW5kb3cgdG8gdGhlIG5ldyB1cmxcblxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB0YXJnZXRVUkxcblxuICAgIH0pXG4gIH1cblxuICBcbiAgLy8gVXBkYXRlIGN1cnJlbnQgbG9jYXRpb24gc2VsZWN0aW9uXG5cbiAgdmFyIGN1cnJlbnRSZWxVUkwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcbiAgdmFyIGN1cnJlbnRWYWx1ZVxuICBcbiAgJCgnI2xvY2F0aW9uRmlsdGVyID4gb3B0aW9uJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgY3VycmVudFZhbHVlID0gJCh0aGlzKS52YWwoKVxuICAgIGlmICggY3VycmVudFJlbFVSTCA9PT0gY3VycmVudFZhbHVlICkge1xuICAgICAgJCgnI2xvY2F0aW9uRmlsdGVyJykuc2VsZWN0Qm94KCd2YWx1ZScsIGN1cnJlbnRWYWx1ZSlcbiAgICB9XG4gIH0pXG5cbn0iLCJcbi8qXG5MaXN0ZW4gZm9yIGNoYW5nZXMgb24gdGhlIGxvY2F0aW9uIGZpbHRlciBkcm9wZG93blxuYW5kIHJlZGlyZWN0IHRoZSB3aW5kb3cgYXBwcm9wcmlhdGVseVxuKi9cblxudmFyIGxvY2F0aW9uRmlsdGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2xvY2F0aW9uLWZpbHRlcicpXG5sb2NhdGlvbkZpbHRlcigpIl19
