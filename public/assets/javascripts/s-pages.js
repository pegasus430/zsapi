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

  updateUrl()

}




updateUrl = function() {


  // Listen for location selections
  // and perform necessary logic

  // #locationFilter present on the select element

  $('#locationFilter').selectBox().change(function () {

      // Get the id of the selected location 

      var targetURL = $(this).val()

      
      // navigate the window to the new url

      window.location = targetURL

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
},{"./components/location-filter":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy9sb2NhdGlvbi1maWx0ZXIuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvcy1wYWdlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5Mb2NhdGlvbiBGaWx0ZXIgTG9naWMgKGRyb3Bkb3ducylcblxuTm90ZXM6IFxuXG4tIFRoZXJlJ3MgYSBwbHVnaW4gYmVpbmcgdXNlZCBmb3IgdGhlIHNlbGVjdGJveGVzIHRoYXQgbmVjZXNzaXRhdGVzXG4gIGEgY2FsbCB0byB0aGVpciBtZXRob2QgZm9yIHRoZSBjaGFuZ2UgZXZlbnQgdG8gd29ya1xuICBTZWUgbW9yZSBvbiB0aGlzIG9uIHRoZWlyIEdpdGh1YiByZWFkbWU6IFxuICBodHRwczovL2dpdGh1Yi5jb20vbWFyY2ovanF1ZXJ5LXNlbGVjdEJveFxuXG4qL1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gIHVwZGF0ZVVybCgpXG5cbn1cblxuXG5cblxudXBkYXRlVXJsID0gZnVuY3Rpb24oKSB7XG5cblxuICAvLyBMaXN0ZW4gZm9yIGxvY2F0aW9uIHNlbGVjdGlvbnNcbiAgLy8gYW5kIHBlcmZvcm0gbmVjZXNzYXJ5IGxvZ2ljXG5cbiAgLy8gI2xvY2F0aW9uRmlsdGVyIHByZXNlbnQgb24gdGhlIHNlbGVjdCBlbGVtZW50XG5cbiAgJCgnI2xvY2F0aW9uRmlsdGVyJykuc2VsZWN0Qm94KCkuY2hhbmdlKGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8gR2V0IHRoZSBpZCBvZiB0aGUgc2VsZWN0ZWQgbG9jYXRpb24gXG5cbiAgICAgIHZhciB0YXJnZXRVUkwgPSAkKHRoaXMpLnZhbCgpXG5cbiAgICAgIFxuICAgICAgLy8gbmF2aWdhdGUgdGhlIHdpbmRvdyB0byB0aGUgbmV3IHVybFxuXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSB0YXJnZXRVUkxcblxuICB9KVxuXG59IiwiLypcblxucy1wYWdlc1xuXG5cbk5vdGVzOlxuLSBhIHBlci1jb250cm9sbGVyLXNwZWNpZmljIGZpbGVcbi0gaW5jbHVkZWQgb24gdGhlIERhc2hib2FyZFxuXG4qL1xuXG5cblxuXG4vLyBMaXN0ZW4gZm9yIGNoYW5nZXMgb24gdGhlIGxvY2F0aW9uIGZpbHRlciBkcm9wZG93blxuLy8gYW5kIHJlZGlyZWN0IHRoZSB3aW5kb3cgYXBwcm9wcmlhdGVseVxuXG52YXIgbG9jYXRpb25GaWx0ZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9jYXRpb24tZmlsdGVyJykgXG5sb2NhdGlvbkZpbHRlcigpIl19
