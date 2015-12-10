(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// todo: refactor these into helper module(s)



var hexDigits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

var rgb2hex = function(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return '#' + hex_value(rgb[1]) + hex_value(rgb[2]) + hex_value(rgb[3]);
};

var hex_value = function(x) {
  if (isNaN(x)) {
    return '00';
  } else {
    return hexDigits[(x - (x % 16)) / 16] + hexDigits[x % 16];
  }
};

var detectColors = function(image) {
  var colorThief, detected_colors, hex, i, results;
  colorThief = new ColorThief;
  detected_colors = Array();
  detected_colors = colorThief.getPalette(image, 5);
  $('.paletteColors').empty();
  i = detected_colors.length - 1;
  results = [];
  while (i >= 0) {
    hex = rgb2hex('rgb(' + detected_colors[i][0] + ',' + detected_colors[i][1] + ',' + detected_colors[i][2] + ')');
    $('.paletteColors').append('<div class="color" data-hex="' + hex + '" style="background-color: rgb(' + detected_colors[i][0] + ',' + detected_colors[i][1] + ',' + detected_colors[i][2] + ');"></div>');
    results.push(i--);
  }
  return results;
};





/*
Color Picker
TODO: refactor this into a module
*/

(function($) {

  // COLOR PICKER
  var color_picker_options = {
    control: 'wheel',
    position: 'right'
  };


  // Init colorpickers
  $('#colorPicker1').minicolors(color_picker_options);
  $('#colorPicker2').minicolors(color_picker_options);

  // Set the last active color picker when clicked
  window.last_active_color_picker = false;
  $('#colorPicker1, #colorPicker2').click(function() {
    return window.last_active_color_picker = $(this);
  });
  
  // When clicking a detected color, apply it to the last selected colorpicker
  $('.paletteColors').on('click', '.color', function() {
    console.log(window.last_active_color_picker);
    if (window.last_active_color_picker) {
      window.last_active_color_picker.val($(this).data('hex'));
      return window.last_active_color_picker.minicolors('value', $(this).data('hex'));
    }
  });
  // COLOR PICKER


  // Detect the colors from the saved image using colorthief
  $('#refreshDetectedColors').click(function(e) {
    var img;
    img = new Image();
    img.src = window.cropper.getDataURL();
    detectColors(img);
    return false;
    return e.preventDefault();
  });


  // Update the business preview
  return updatePreview = function() {
    var text;
    $('.previewHeader').css('background-color', $('#colorPicker1').val());
    $('.content, .socialFooter').css('background-color', $('#colorPicker2').val());
    $('.previewHeader img').attr('src', $('.theImage').val());
    $('.content h1').html($('.businessName').val());
    text = $('.address').val() + ' ' + $('.address2').val() + ' ' + $('.city').val() + ' ' + $('.state').val() + ' ' + $('.zipCode').val();
    return $('.content p').html(text);
  };

})(jQuery);
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvcy1idXNpbmVzc2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gdG9kbzogcmVmYWN0b3IgdGhlc2UgaW50byBoZWxwZXIgbW9kdWxlKHMpXG5cblxuXG52YXIgaGV4RGlnaXRzID0gbmV3IEFycmF5KCcwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJyk7XG5cbnZhciByZ2IyaGV4ID0gZnVuY3Rpb24ocmdiKSB7XG4gIHJnYiA9IHJnYi5tYXRjaCgvXnJnYlxcKChcXGQrKSxcXHMqKFxcZCspLFxccyooXFxkKylcXCkkLyk7XG4gIHJldHVybiAnIycgKyBoZXhfdmFsdWUocmdiWzFdKSArIGhleF92YWx1ZShyZ2JbMl0pICsgaGV4X3ZhbHVlKHJnYlszXSk7XG59O1xuXG52YXIgaGV4X3ZhbHVlID0gZnVuY3Rpb24oeCkge1xuICBpZiAoaXNOYU4oeCkpIHtcbiAgICByZXR1cm4gJzAwJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaGV4RGlnaXRzWyh4IC0gKHggJSAxNikpIC8gMTZdICsgaGV4RGlnaXRzW3ggJSAxNl07XG4gIH1cbn07XG5cbnZhciBkZXRlY3RDb2xvcnMgPSBmdW5jdGlvbihpbWFnZSkge1xuICB2YXIgY29sb3JUaGllZiwgZGV0ZWN0ZWRfY29sb3JzLCBoZXgsIGksIHJlc3VsdHM7XG4gIGNvbG9yVGhpZWYgPSBuZXcgQ29sb3JUaGllZjtcbiAgZGV0ZWN0ZWRfY29sb3JzID0gQXJyYXkoKTtcbiAgZGV0ZWN0ZWRfY29sb3JzID0gY29sb3JUaGllZi5nZXRQYWxldHRlKGltYWdlLCA1KTtcbiAgJCgnLnBhbGV0dGVDb2xvcnMnKS5lbXB0eSgpO1xuICBpID0gZGV0ZWN0ZWRfY29sb3JzLmxlbmd0aCAtIDE7XG4gIHJlc3VsdHMgPSBbXTtcbiAgd2hpbGUgKGkgPj0gMCkge1xuICAgIGhleCA9IHJnYjJoZXgoJ3JnYignICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzBdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzFdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzJdICsgJyknKTtcbiAgICAkKCcucGFsZXR0ZUNvbG9ycycpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImNvbG9yXCIgZGF0YS1oZXg9XCInICsgaGV4ICsgJ1wiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogcmdiKCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMF0gKyAnLCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMV0gKyAnLCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMl0gKyAnKTtcIj48L2Rpdj4nKTtcbiAgICByZXN1bHRzLnB1c2goaS0tKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cblxuXG5cblxuLypcbkNvbG9yIFBpY2tlclxuVE9ETzogcmVmYWN0b3IgdGhpcyBpbnRvIGEgbW9kdWxlXG4qL1xuXG4oZnVuY3Rpb24oJCkge1xuXG4gIC8vIENPTE9SIFBJQ0tFUlxuICB2YXIgY29sb3JfcGlja2VyX29wdGlvbnMgPSB7XG4gICAgY29udHJvbDogJ3doZWVsJyxcbiAgICBwb3NpdGlvbjogJ3JpZ2h0J1xuICB9O1xuXG5cbiAgLy8gSW5pdCBjb2xvcnBpY2tlcnNcbiAgJCgnI2NvbG9yUGlja2VyMScpLm1pbmljb2xvcnMoY29sb3JfcGlja2VyX29wdGlvbnMpO1xuICAkKCcjY29sb3JQaWNrZXIyJykubWluaWNvbG9ycyhjb2xvcl9waWNrZXJfb3B0aW9ucyk7XG5cbiAgLy8gU2V0IHRoZSBsYXN0IGFjdGl2ZSBjb2xvciBwaWNrZXIgd2hlbiBjbGlja2VkXG4gIHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIgPSBmYWxzZTtcbiAgJCgnI2NvbG9yUGlja2VyMSwgI2NvbG9yUGlja2VyMicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyID0gJCh0aGlzKTtcbiAgfSk7XG4gIFxuICAvLyBXaGVuIGNsaWNraW5nIGEgZGV0ZWN0ZWQgY29sb3IsIGFwcGx5IGl0IHRvIHRoZSBsYXN0IHNlbGVjdGVkIGNvbG9ycGlja2VyXG4gICQoJy5wYWxldHRlQ29sb3JzJykub24oJ2NsaWNrJywgJy5jb2xvcicsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIpO1xuICAgIGlmICh3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyKSB7XG4gICAgICB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyLnZhbCgkKHRoaXMpLmRhdGEoJ2hleCcpKTtcbiAgICAgIHJldHVybiB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyLm1pbmljb2xvcnMoJ3ZhbHVlJywgJCh0aGlzKS5kYXRhKCdoZXgnKSk7XG4gICAgfVxuICB9KTtcbiAgLy8gQ09MT1IgUElDS0VSXG5cblxuICAvLyBEZXRlY3QgdGhlIGNvbG9ycyBmcm9tIHRoZSBzYXZlZCBpbWFnZSB1c2luZyBjb2xvcnRoaWVmXG4gICQoJyNyZWZyZXNoRGV0ZWN0ZWRDb2xvcnMnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgdmFyIGltZztcbiAgICBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gd2luZG93LmNyb3BwZXIuZ2V0RGF0YVVSTCgpO1xuICAgIGRldGVjdENvbG9ycyhpbWcpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuXG4gIC8vIFVwZGF0ZSB0aGUgYnVzaW5lc3MgcHJldmlld1xuICByZXR1cm4gdXBkYXRlUHJldmlldyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0ZXh0O1xuICAgICQoJy5wcmV2aWV3SGVhZGVyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJCgnI2NvbG9yUGlja2VyMScpLnZhbCgpKTtcbiAgICAkKCcuY29udGVudCwgLnNvY2lhbEZvb3RlcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICQoJyNjb2xvclBpY2tlcjInKS52YWwoKSk7XG4gICAgJCgnLnByZXZpZXdIZWFkZXIgaW1nJykuYXR0cignc3JjJywgJCgnLnRoZUltYWdlJykudmFsKCkpO1xuICAgICQoJy5jb250ZW50IGgxJykuaHRtbCgkKCcuYnVzaW5lc3NOYW1lJykudmFsKCkpO1xuICAgIHRleHQgPSAkKCcuYWRkcmVzcycpLnZhbCgpICsgJyAnICsgJCgnLmFkZHJlc3MyJykudmFsKCkgKyAnICcgKyAkKCcuY2l0eScpLnZhbCgpICsgJyAnICsgJCgnLnN0YXRlJykudmFsKCkgKyAnICcgKyAkKCcuemlwQ29kZScpLnZhbCgpO1xuICAgIHJldHVybiAkKCcuY29udGVudCBwJykuaHRtbCh0ZXh0KTtcbiAgfTtcblxufSkoalF1ZXJ5KTsiXX0=
