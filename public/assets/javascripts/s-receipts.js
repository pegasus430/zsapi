(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy9sb2NhdGlvbi1maWx0ZXIuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvcy1yZWNlaXB0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5Mb2NhdGlvbiBGaWx0ZXIgTG9naWMgKGRyb3Bkb3ducylcblxuTm90ZXM6IFxuXG4tIFRoZXJlJ3MgYSBwbHVnaW4gYmVpbmcgdXNlZCBmb3IgdGhlIHNlbGVjdGJveGVzIHRoYXQgbmVjZXNzaXRhdGVzXG4gIGEgY2FsbCB0byB0aGVpciBtZXRob2QgZm9yIHRoZSBjaGFuZ2UgZXZlbnQgdG8gd29ya1xuICBTZWUgbW9yZSBvbiB0aGlzIG9uIHRoZWlyIEdpdGh1YiByZWFkbWU6IFxuICBodHRwczovL2dpdGh1Yi5jb20vbWFyY2ovanF1ZXJ5LXNlbGVjdEJveFxuXG4qL1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuXG4gIC8vIExpc3RlbiBmb3IgbG9jYXRpb24gc2VsZWN0aW9uc1xuICAvLyBhbmQgcGVyZm9ybSBuZWNlc3NhcnkgbG9naWNcbiAgXG4gIC8vICNsb2NhdGlvbkZpbHRlciBwcmVzZW50IG9uIHRoZSBzZWxlY3QgZWxlbWVudFxuICB2YXIgbG9jYXRpb25GaWx0ZXIgPSAkKCcjbG9jYXRpb25GaWx0ZXInKVxuXG4gIGlmICggbG9jYXRpb25GaWx0ZXIgIT09IHVuZGVmaW5lZCB8fCBsb2NhdGlvbkZpbHRlciAhPT0gbnVsbCApIHtcblxuICAgICQoJyNsb2NhdGlvbkZpbHRlcicpLnNlbGVjdEJveCgpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBpZCBvZiB0aGUgc2VsZWN0ZWQgbG9jYXRpb24gXG5cbiAgICAgICAgdmFyIHRhcmdldFVSTCA9ICQodGhpcykudmFsKClcblxuICAgICAgICBcbiAgICAgICAgLy8gbmF2aWdhdGUgdGhlIHdpbmRvdyB0byB0aGUgbmV3IHVybFxuXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHRhcmdldFVSTFxuXG4gICAgfSlcbiAgfVxuXG4gIFxuICAvLyBVcGRhdGUgY3VycmVudCBsb2NhdGlvbiBzZWxlY3Rpb25cblxuICB2YXIgY3VycmVudFJlbFVSTCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZVxuICB2YXIgY3VycmVudFZhbHVlXG4gIFxuICAkKCcjbG9jYXRpb25GaWx0ZXIgPiBvcHRpb24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyZW50VmFsdWUgPSAkKHRoaXMpLnZhbCgpXG4gICAgaWYgKCBjdXJyZW50UmVsVVJMID09PSBjdXJyZW50VmFsdWUgKSB7XG4gICAgICAkKCcjbG9jYXRpb25GaWx0ZXInKS5zZWxlY3RCb3goJ3ZhbHVlJywgY3VycmVudFZhbHVlKVxuICAgIH1cbiAgfSlcblxufSIsIlxuLypcbkxpc3RlbiBmb3IgY2hhbmdlcyBvbiB0aGUgbG9jYXRpb24gZmlsdGVyIGRyb3Bkb3duXG5hbmQgcmVkaXJlY3QgdGhlIHdpbmRvdyBhcHByb3ByaWF0ZWx5XG4qL1xuXG52YXIgbG9jYXRpb25GaWx0ZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9jYXRpb24tZmlsdGVyJylcbmxvY2F0aW9uRmlsdGVyKCkiXX0=
