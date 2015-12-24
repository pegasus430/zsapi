(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*

Toggle Sections

Addordian-like functionality for page sections

Notes:
- transition on height is handled via css

*/





var toggleSections = $('.toggle-section')
var height
var sectionHeight
var sectionToShow
var currentID
var nextBtns = $('.toggle-section_btn-next')
var prevBtns = $('.toggle-section_btn-prev')



module.exports = function() {

  // First, remove first and last btns

  removeFirstAndLastBtns() 


  // Once images have loaded, set the toggle sections

  $(window).on("load", function() {

    toggle()

  })


  // Set event listeners on the next/prev btns

  setButtons()

} // end exports



var toggle = function() {


  toggleSections.each(function(i) {
      var section = $(this)


      // Height is set to 0 in css
      // by using the incredibly niffty scrollHeight, 
      // we can get the height anyways 
      // see: 
      // http://stackoverflow.com/questions/5003220/javascript-jquery-animate-to-auto-height#answer-24762848
      height = section.get(0).scrollHeight


      // Store height
      section.attr('data-height', height)


      // Prepare the section:
      // - add id with the section's index
      section.attr('data-toggle-target', 'toggle-'+i)


      // Prepare the heading:
      // add class (for proper styling)
      // (note: this could be done in advance in the dom, 
      // but I'm unsure if this is worth the effort...
      // as the current rails helper doesn't yet allow for this)
      section.prev().find('h2')
        .attr('id', 'toggle-'+i)
        .addClass('section-toggle')


      // Click Listener
      // Scoped to the document, making use of jQuery's convience-behavior 
      // which prevents the need for a closure (otherwise needed when 
      // attaching event handlers inside of a loop, as JS evaluates functions
      // at the time of execution)

      $(document).on('click', ('#toggle-'+i), function() {
        var $this = $(this)
        
        updateToggle($this)

      }) // end click handler  

    }) // end loop


  /*
  Set first to open
  */

  var fistSection = $('#toggle-0')
  updateToggle(fistSection)

      
}









var updateToggle = function(target) {


  // Close previously open section
  $('.toggle-section').attr('style', 'height: 0')
  $('.section-toggle').removeClass('open')


  /*
  Open clicked section
  */

  // Add open class to heading (which effectively changes 
  // the plus to a minus, via the css)

  target.addClass('open')


  // Grab the clicked heading's id

  currentID = target.attr('id')
  

  // cache the section to show,
  // selecting via the data-toggle-target, which is set to 
  // it's respective heading's id

  sectionToShow = $('[data-toggle-target="'+currentID+'"]')


  // grab the target section's height

  sectionHeight = sectionToShow.data('height') + 'px';


  // show it

  sectionToShow.attr('style', 'height: '+sectionHeight)


}





var setButtons = function() {

  nextBtns.each(function(i) {
    $(this).on('click', function(e) {

      e.preventDefault()

      nextIndex = i + 1

      var nextTarget = $('#toggle-'+nextIndex)
      updateToggle(nextTarget)

    })
  })

  prevBtns.each(function(i) {
    $(this).on('click', function(e) {

      e.preventDefault()

      prevIndex = i - 1

      var prevTarget = $('#toggle-'+prevIndex)
      updateToggle(prevTarget)

    })
  })

}



var removeFirstAndLastBtns = function() {
  prevBtns.first().addClass('hidden')
  nextBtns.last().addClass('hidden')
}
},{}],2:[function(require,module,exports){
// todo: refactor these into helper module(s)



/*
Toggleable Sections
*/

var toggleSections = require('./components/toggle-section')
toggleSections()




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
},{"./components/toggle-section":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy90b2dnbGUtc2VjdGlvbi5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9zLWJ1c2luZXNzZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuXG5Ub2dnbGUgU2VjdGlvbnNcblxuQWRkb3JkaWFuLWxpa2UgZnVuY3Rpb25hbGl0eSBmb3IgcGFnZSBzZWN0aW9uc1xuXG5Ob3Rlczpcbi0gdHJhbnNpdGlvbiBvbiBoZWlnaHQgaXMgaGFuZGxlZCB2aWEgY3NzXG5cbiovXG5cblxuXG5cblxudmFyIHRvZ2dsZVNlY3Rpb25zID0gJCgnLnRvZ2dsZS1zZWN0aW9uJylcbnZhciBoZWlnaHRcbnZhciBzZWN0aW9uSGVpZ2h0XG52YXIgc2VjdGlvblRvU2hvd1xudmFyIGN1cnJlbnRJRFxudmFyIG5leHRCdG5zID0gJCgnLnRvZ2dsZS1zZWN0aW9uX2J0bi1uZXh0JylcbnZhciBwcmV2QnRucyA9ICQoJy50b2dnbGUtc2VjdGlvbl9idG4tcHJldicpXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIEZpcnN0LCByZW1vdmUgZmlyc3QgYW5kIGxhc3QgYnRuc1xuXG4gIHJlbW92ZUZpcnN0QW5kTGFzdEJ0bnMoKSBcblxuXG4gIC8vIE9uY2UgaW1hZ2VzIGhhdmUgbG9hZGVkLCBzZXQgdGhlIHRvZ2dsZSBzZWN0aW9uc1xuXG4gICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICB0b2dnbGUoKVxuXG4gIH0pXG5cblxuICAvLyBTZXQgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZSBuZXh0L3ByZXYgYnRuc1xuXG4gIHNldEJ1dHRvbnMoKVxuXG59IC8vIGVuZCBleHBvcnRzXG5cblxuXG52YXIgdG9nZ2xlID0gZnVuY3Rpb24oKSB7XG5cblxuICB0b2dnbGVTZWN0aW9ucy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHZhciBzZWN0aW9uID0gJCh0aGlzKVxuXG5cbiAgICAgIC8vIEhlaWdodCBpcyBzZXQgdG8gMCBpbiBjc3NcbiAgICAgIC8vIGJ5IHVzaW5nIHRoZSBpbmNyZWRpYmx5IG5pZmZ0eSBzY3JvbGxIZWlnaHQsIFxuICAgICAgLy8gd2UgY2FuIGdldCB0aGUgaGVpZ2h0IGFueXdheXMgXG4gICAgICAvLyBzZWU6IFxuICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MDAzMjIwL2phdmFzY3JpcHQtanF1ZXJ5LWFuaW1hdGUtdG8tYXV0by1oZWlnaHQjYW5zd2VyLTI0NzYyODQ4XG4gICAgICBoZWlnaHQgPSBzZWN0aW9uLmdldCgwKS5zY3JvbGxIZWlnaHRcblxuXG4gICAgICAvLyBTdG9yZSBoZWlnaHRcbiAgICAgIHNlY3Rpb24uYXR0cignZGF0YS1oZWlnaHQnLCBoZWlnaHQpXG5cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgc2VjdGlvbjpcbiAgICAgIC8vIC0gYWRkIGlkIHdpdGggdGhlIHNlY3Rpb24ncyBpbmRleFxuICAgICAgc2VjdGlvbi5hdHRyKCdkYXRhLXRvZ2dsZS10YXJnZXQnLCAndG9nZ2xlLScraSlcblxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSBoZWFkaW5nOlxuICAgICAgLy8gYWRkIGNsYXNzIChmb3IgcHJvcGVyIHN0eWxpbmcpXG4gICAgICAvLyAobm90ZTogdGhpcyBjb3VsZCBiZSBkb25lIGluIGFkdmFuY2UgaW4gdGhlIGRvbSwgXG4gICAgICAvLyBidXQgSSdtIHVuc3VyZSBpZiB0aGlzIGlzIHdvcnRoIHRoZSBlZmZvcnQuLi5cbiAgICAgIC8vIGFzIHRoZSBjdXJyZW50IHJhaWxzIGhlbHBlciBkb2Vzbid0IHlldCBhbGxvdyBmb3IgdGhpcylcbiAgICAgIHNlY3Rpb24ucHJldigpLmZpbmQoJ2gyJylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ3RvZ2dsZS0nK2kpXG4gICAgICAgIC5hZGRDbGFzcygnc2VjdGlvbi10b2dnbGUnKVxuXG5cbiAgICAgIC8vIENsaWNrIExpc3RlbmVyXG4gICAgICAvLyBTY29wZWQgdG8gdGhlIGRvY3VtZW50LCBtYWtpbmcgdXNlIG9mIGpRdWVyeSdzIGNvbnZpZW5jZS1iZWhhdmlvciBcbiAgICAgIC8vIHdoaWNoIHByZXZlbnRzIHRoZSBuZWVkIGZvciBhIGNsb3N1cmUgKG90aGVyd2lzZSBuZWVkZWQgd2hlbiBcbiAgICAgIC8vIGF0dGFjaGluZyBldmVudCBoYW5kbGVycyBpbnNpZGUgb2YgYSBsb29wLCBhcyBKUyBldmFsdWF0ZXMgZnVuY3Rpb25zXG4gICAgICAvLyBhdCB0aGUgdGltZSBvZiBleGVjdXRpb24pXG5cbiAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICgnI3RvZ2dsZS0nK2kpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgICBcbiAgICAgICAgdXBkYXRlVG9nZ2xlKCR0aGlzKVxuXG4gICAgICB9KSAvLyBlbmQgY2xpY2sgaGFuZGxlciAgXG5cbiAgICB9KSAvLyBlbmQgbG9vcFxuXG5cbiAgLypcbiAgU2V0IGZpcnN0IHRvIG9wZW5cbiAgKi9cblxuICB2YXIgZmlzdFNlY3Rpb24gPSAkKCcjdG9nZ2xlLTAnKVxuICB1cGRhdGVUb2dnbGUoZmlzdFNlY3Rpb24pXG5cbiAgICAgIFxufVxuXG5cblxuXG5cblxuXG5cblxudmFyIHVwZGF0ZVRvZ2dsZSA9IGZ1bmN0aW9uKHRhcmdldCkge1xuXG5cbiAgLy8gQ2xvc2UgcHJldmlvdXNseSBvcGVuIHNlY3Rpb25cbiAgJCgnLnRvZ2dsZS1zZWN0aW9uJykuYXR0cignc3R5bGUnLCAnaGVpZ2h0OiAwJylcbiAgJCgnLnNlY3Rpb24tdG9nZ2xlJykucmVtb3ZlQ2xhc3MoJ29wZW4nKVxuXG5cbiAgLypcbiAgT3BlbiBjbGlja2VkIHNlY3Rpb25cbiAgKi9cblxuICAvLyBBZGQgb3BlbiBjbGFzcyB0byBoZWFkaW5nICh3aGljaCBlZmZlY3RpdmVseSBjaGFuZ2VzIFxuICAvLyB0aGUgcGx1cyB0byBhIG1pbnVzLCB2aWEgdGhlIGNzcylcblxuICB0YXJnZXQuYWRkQ2xhc3MoJ29wZW4nKVxuXG5cbiAgLy8gR3JhYiB0aGUgY2xpY2tlZCBoZWFkaW5nJ3MgaWRcblxuICBjdXJyZW50SUQgPSB0YXJnZXQuYXR0cignaWQnKVxuICBcblxuICAvLyBjYWNoZSB0aGUgc2VjdGlvbiB0byBzaG93LFxuICAvLyBzZWxlY3RpbmcgdmlhIHRoZSBkYXRhLXRvZ2dsZS10YXJnZXQsIHdoaWNoIGlzIHNldCB0byBcbiAgLy8gaXQncyByZXNwZWN0aXZlIGhlYWRpbmcncyBpZFxuXG4gIHNlY3Rpb25Ub1Nob3cgPSAkKCdbZGF0YS10b2dnbGUtdGFyZ2V0PVwiJytjdXJyZW50SUQrJ1wiXScpXG5cblxuICAvLyBncmFiIHRoZSB0YXJnZXQgc2VjdGlvbidzIGhlaWdodFxuXG4gIHNlY3Rpb25IZWlnaHQgPSBzZWN0aW9uVG9TaG93LmRhdGEoJ2hlaWdodCcpICsgJ3B4JztcblxuXG4gIC8vIHNob3cgaXRcblxuICBzZWN0aW9uVG9TaG93LmF0dHIoJ3N0eWxlJywgJ2hlaWdodDogJytzZWN0aW9uSGVpZ2h0KVxuXG5cbn1cblxuXG5cblxuXG52YXIgc2V0QnV0dG9ucyA9IGZ1bmN0aW9uKCkge1xuXG4gIG5leHRCdG5zLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgbmV4dEluZGV4ID0gaSArIDFcblxuICAgICAgdmFyIG5leHRUYXJnZXQgPSAkKCcjdG9nZ2xlLScrbmV4dEluZGV4KVxuICAgICAgdXBkYXRlVG9nZ2xlKG5leHRUYXJnZXQpXG5cbiAgICB9KVxuICB9KVxuXG4gIHByZXZCdG5zLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgcHJldkluZGV4ID0gaSAtIDFcblxuICAgICAgdmFyIHByZXZUYXJnZXQgPSAkKCcjdG9nZ2xlLScrcHJldkluZGV4KVxuICAgICAgdXBkYXRlVG9nZ2xlKHByZXZUYXJnZXQpXG5cbiAgICB9KVxuICB9KVxuXG59XG5cblxuXG52YXIgcmVtb3ZlRmlyc3RBbmRMYXN0QnRucyA9IGZ1bmN0aW9uKCkge1xuICBwcmV2QnRucy5maXJzdCgpLmFkZENsYXNzKCdoaWRkZW4nKVxuICBuZXh0QnRucy5sYXN0KCkuYWRkQ2xhc3MoJ2hpZGRlbicpXG59IiwiLy8gdG9kbzogcmVmYWN0b3IgdGhlc2UgaW50byBoZWxwZXIgbW9kdWxlKHMpXG5cblxuXG4vKlxuVG9nZ2xlYWJsZSBTZWN0aW9uc1xuKi9cblxudmFyIHRvZ2dsZVNlY3Rpb25zID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RvZ2dsZS1zZWN0aW9uJylcbnRvZ2dsZVNlY3Rpb25zKClcblxuXG5cblxudmFyIGhleERpZ2l0cyA9IG5ldyBBcnJheSgnMCcsICcxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICdhJywgJ2InLCAnYycsICdkJywgJ2UnLCAnZicpO1xuXG52YXIgcmdiMmhleCA9IGZ1bmN0aW9uKHJnYikge1xuICByZ2IgPSByZ2IubWF0Y2goL15yZ2JcXCgoXFxkKyksXFxzKihcXGQrKSxcXHMqKFxcZCspXFwpJC8pO1xuICByZXR1cm4gJyMnICsgaGV4X3ZhbHVlKHJnYlsxXSkgKyBoZXhfdmFsdWUocmdiWzJdKSArIGhleF92YWx1ZShyZ2JbM10pO1xufTtcblxudmFyIGhleF92YWx1ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgaWYgKGlzTmFOKHgpKSB7XG4gICAgcmV0dXJuICcwMCc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGhleERpZ2l0c1soeCAtICh4ICUgMTYpKSAvIDE2XSArIGhleERpZ2l0c1t4ICUgMTZdO1xuICB9XG59O1xuXG52YXIgZGV0ZWN0Q29sb3JzID0gZnVuY3Rpb24oaW1hZ2UpIHtcbiAgdmFyIGNvbG9yVGhpZWYsIGRldGVjdGVkX2NvbG9ycywgaGV4LCBpLCByZXN1bHRzO1xuICBjb2xvclRoaWVmID0gbmV3IENvbG9yVGhpZWY7XG4gIGRldGVjdGVkX2NvbG9ycyA9IEFycmF5KCk7XG4gIGRldGVjdGVkX2NvbG9ycyA9IGNvbG9yVGhpZWYuZ2V0UGFsZXR0ZShpbWFnZSwgNSk7XG4gICQoJy5wYWxldHRlQ29sb3JzJykuZW1wdHkoKTtcbiAgaSA9IGRldGVjdGVkX2NvbG9ycy5sZW5ndGggLSAxO1xuICByZXN1bHRzID0gW107XG4gIHdoaWxlIChpID49IDApIHtcbiAgICBoZXggPSByZ2IyaGV4KCdyZ2IoJyArIGRldGVjdGVkX2NvbG9yc1tpXVswXSArICcsJyArIGRldGVjdGVkX2NvbG9yc1tpXVsxXSArICcsJyArIGRldGVjdGVkX2NvbG9yc1tpXVsyXSArICcpJyk7XG4gICAgJCgnLnBhbGV0dGVDb2xvcnMnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjb2xvclwiIGRhdGEtaGV4PVwiJyArIGhleCArICdcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHJnYignICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzBdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzFdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzJdICsgJyk7XCI+PC9kaXY+Jyk7XG4gICAgcmVzdWx0cy5wdXNoKGktLSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG5cblxuXG5cbi8qXG5Db2xvciBQaWNrZXJcblRPRE86IHJlZmFjdG9yIHRoaXMgaW50byBhIG1vZHVsZVxuKi9cblxuKGZ1bmN0aW9uKCQpIHtcblxuICAvLyBDT0xPUiBQSUNLRVJcbiAgdmFyIGNvbG9yX3BpY2tlcl9vcHRpb25zID0ge1xuICAgIGNvbnRyb2w6ICd3aGVlbCcsXG4gICAgcG9zaXRpb246ICdyaWdodCdcbiAgfTtcblxuXG4gIC8vIEluaXQgY29sb3JwaWNrZXJzXG4gICQoJyNjb2xvclBpY2tlcjEnKS5taW5pY29sb3JzKGNvbG9yX3BpY2tlcl9vcHRpb25zKTtcbiAgJCgnI2NvbG9yUGlja2VyMicpLm1pbmljb2xvcnMoY29sb3JfcGlja2VyX29wdGlvbnMpO1xuXG4gIC8vIFNldCB0aGUgbGFzdCBhY3RpdmUgY29sb3IgcGlja2VyIHdoZW4gY2xpY2tlZFxuICB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyID0gZmFsc2U7XG4gICQoJyNjb2xvclBpY2tlcjEsICNjb2xvclBpY2tlcjInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlciA9ICQodGhpcyk7XG4gIH0pO1xuICBcbiAgLy8gV2hlbiBjbGlja2luZyBhIGRldGVjdGVkIGNvbG9yLCBhcHBseSBpdCB0byB0aGUgbGFzdCBzZWxlY3RlZCBjb2xvcnBpY2tlclxuICAkKCcucGFsZXR0ZUNvbG9ycycpLm9uKCdjbGljaycsICcuY29sb3InLCBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyh3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyKTtcbiAgICBpZiAod2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlcikge1xuICAgICAgd2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlci52YWwoJCh0aGlzKS5kYXRhKCdoZXgnKSk7XG4gICAgICByZXR1cm4gd2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlci5taW5pY29sb3JzKCd2YWx1ZScsICQodGhpcykuZGF0YSgnaGV4JykpO1xuICAgIH1cbiAgfSk7XG4gIC8vIENPTE9SIFBJQ0tFUlxuXG5cbiAgLy8gRGV0ZWN0IHRoZSBjb2xvcnMgZnJvbSB0aGUgc2F2ZWQgaW1hZ2UgdXNpbmcgY29sb3J0aGllZlxuICAkKCcjcmVmcmVzaERldGVjdGVkQ29sb3JzJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIHZhciBpbWc7XG4gICAgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9IHdpbmRvdy5jcm9wcGVyLmdldERhdGFVUkwoKTtcbiAgICBkZXRlY3RDb2xvcnMoaW1nKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG5cblxuICAvLyBVcGRhdGUgdGhlIGJ1c2luZXNzIHByZXZpZXdcbiAgcmV0dXJuIHVwZGF0ZVByZXZpZXcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGV4dDtcbiAgICAkKCcucHJldmlld0hlYWRlcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICQoJyNjb2xvclBpY2tlcjEnKS52YWwoKSk7XG4gICAgJCgnLmNvbnRlbnQsIC5zb2NpYWxGb290ZXInKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAkKCcjY29sb3JQaWNrZXIyJykudmFsKCkpO1xuICAgICQoJy5wcmV2aWV3SGVhZGVyIGltZycpLmF0dHIoJ3NyYycsICQoJy50aGVJbWFnZScpLnZhbCgpKTtcbiAgICAkKCcuY29udGVudCBoMScpLmh0bWwoJCgnLmJ1c2luZXNzTmFtZScpLnZhbCgpKTtcbiAgICB0ZXh0ID0gJCgnLmFkZHJlc3MnKS52YWwoKSArICcgJyArICQoJy5hZGRyZXNzMicpLnZhbCgpICsgJyAnICsgJCgnLmNpdHknKS52YWwoKSArICcgJyArICQoJy5zdGF0ZScpLnZhbCgpICsgJyAnICsgJCgnLnppcENvZGUnKS52YWwoKTtcbiAgICByZXR1cm4gJCgnLmNvbnRlbnQgcCcpLmh0bWwodGV4dCk7XG4gIH07XG5cbn0pKGpRdWVyeSk7Il19
