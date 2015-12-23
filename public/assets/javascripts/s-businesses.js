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


  // Once images have loaded, set the toggle
  // sections

  $(window).on("load", function() {

    toggle()

  })


  // Set event listeners on the next/prev btns

  setButtons()

} // end exports


// $("#first").animate({height: $("#first").get(0).scrollHeight}, 1000 );

var toggle = function() {


  toggleSections.each(function(i) {
      var section = $(this)


      // Height is set to 0 in css
      // by using the incredibly niffty scrollHeight, 
      // we can get the height anyways 
      // see: 
      // http://stackoverflow.com/questions/5003220/javascript-jquery-animate-to-auto-height#answer-24762848
      height = section.get(0).scrollHeight

      section.attr('data-height', height)
      // Set height on data attribute
      // height = section.height()
      // Store it for later use
      // when done... hide sections
      // section.attr('data-height', section.height()).promise().done( function() {
      //   // Collapse all sections
      //   section.attr('style', 'height:0')
      // })


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy90b2dnbGUtc2VjdGlvbi5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9zLWJ1c2luZXNzZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuXG5Ub2dnbGUgU2VjdGlvbnNcblxuQWRkb3JkaWFuLWxpa2UgZnVuY3Rpb25hbGl0eSBmb3IgcGFnZSBzZWN0aW9uc1xuXG5Ob3Rlczpcbi0gdHJhbnNpdGlvbiBvbiBoZWlnaHQgaXMgaGFuZGxlZCB2aWEgY3NzXG5cbiovXG5cblxuXG5cblxudmFyIHRvZ2dsZVNlY3Rpb25zID0gJCgnLnRvZ2dsZS1zZWN0aW9uJylcbnZhciBoZWlnaHRcbnZhciBzZWN0aW9uSGVpZ2h0XG52YXIgc2VjdGlvblRvU2hvd1xudmFyIGN1cnJlbnRJRFxudmFyIG5leHRCdG5zID0gJCgnLnRvZ2dsZS1zZWN0aW9uX2J0bi1uZXh0JylcbnZhciBwcmV2QnRucyA9ICQoJy50b2dnbGUtc2VjdGlvbl9idG4tcHJldicpXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIEZpcnN0LCByZW1vdmUgZmlyc3QgYW5kIGxhc3QgYnRuc1xuXG4gIHJlbW92ZUZpcnN0QW5kTGFzdEJ0bnMoKSBcblxuXG4gIC8vIE9uY2UgaW1hZ2VzIGhhdmUgbG9hZGVkLCBzZXQgdGhlIHRvZ2dsZVxuICAvLyBzZWN0aW9uc1xuXG4gICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICB0b2dnbGUoKVxuXG4gIH0pXG5cblxuICAvLyBTZXQgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZSBuZXh0L3ByZXYgYnRuc1xuXG4gIHNldEJ1dHRvbnMoKVxuXG59IC8vIGVuZCBleHBvcnRzXG5cblxuLy8gJChcIiNmaXJzdFwiKS5hbmltYXRlKHtoZWlnaHQ6ICQoXCIjZmlyc3RcIikuZ2V0KDApLnNjcm9sbEhlaWdodH0sIDEwMDAgKTtcblxudmFyIHRvZ2dsZSA9IGZ1bmN0aW9uKCkge1xuXG5cbiAgdG9nZ2xlU2VjdGlvbnMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICB2YXIgc2VjdGlvbiA9ICQodGhpcylcblxuXG4gICAgICAvLyBIZWlnaHQgaXMgc2V0IHRvIDAgaW4gY3NzXG4gICAgICAvLyBieSB1c2luZyB0aGUgaW5jcmVkaWJseSBuaWZmdHkgc2Nyb2xsSGVpZ2h0LCBcbiAgICAgIC8vIHdlIGNhbiBnZXQgdGhlIGhlaWdodCBhbnl3YXlzIFxuICAgICAgLy8gc2VlOiBcbiAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTAwMzIyMC9qYXZhc2NyaXB0LWpxdWVyeS1hbmltYXRlLXRvLWF1dG8taGVpZ2h0I2Fuc3dlci0yNDc2Mjg0OFxuICAgICAgaGVpZ2h0ID0gc2VjdGlvbi5nZXQoMCkuc2Nyb2xsSGVpZ2h0XG5cbiAgICAgIHNlY3Rpb24uYXR0cignZGF0YS1oZWlnaHQnLCBoZWlnaHQpXG4gICAgICAvLyBTZXQgaGVpZ2h0IG9uIGRhdGEgYXR0cmlidXRlXG4gICAgICAvLyBoZWlnaHQgPSBzZWN0aW9uLmhlaWdodCgpXG4gICAgICAvLyBTdG9yZSBpdCBmb3IgbGF0ZXIgdXNlXG4gICAgICAvLyB3aGVuIGRvbmUuLi4gaGlkZSBzZWN0aW9uc1xuICAgICAgLy8gc2VjdGlvbi5hdHRyKCdkYXRhLWhlaWdodCcsIHNlY3Rpb24uaGVpZ2h0KCkpLnByb21pc2UoKS5kb25lKCBmdW5jdGlvbigpIHtcbiAgICAgIC8vICAgLy8gQ29sbGFwc2UgYWxsIHNlY3Rpb25zXG4gICAgICAvLyAgIHNlY3Rpb24uYXR0cignc3R5bGUnLCAnaGVpZ2h0OjAnKVxuICAgICAgLy8gfSlcblxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSBzZWN0aW9uOlxuICAgICAgLy8gLSBhZGQgaWQgd2l0aCB0aGUgc2VjdGlvbidzIGluZGV4XG4gICAgICBzZWN0aW9uLmF0dHIoJ2RhdGEtdG9nZ2xlLXRhcmdldCcsICd0b2dnbGUtJytpKVxuXG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIGhlYWRpbmc6XG4gICAgICAvLyBhZGQgY2xhc3MgKGZvciBwcm9wZXIgc3R5bGluZylcbiAgICAgIC8vIChub3RlOiB0aGlzIGNvdWxkIGJlIGRvbmUgaW4gYWR2YW5jZSBpbiB0aGUgZG9tLCBcbiAgICAgIC8vIGJ1dCBJJ20gdW5zdXJlIGlmIHRoaXMgaXMgd29ydGggdGhlIGVmZm9ydC4uLlxuICAgICAgLy8gYXMgdGhlIGN1cnJlbnQgcmFpbHMgaGVscGVyIGRvZXNuJ3QgeWV0IGFsbG93IGZvciB0aGlzKVxuICAgICAgc2VjdGlvbi5wcmV2KCkuZmluZCgnaDInKVxuICAgICAgICAuYXR0cignaWQnLCAndG9nZ2xlLScraSlcbiAgICAgICAgLmFkZENsYXNzKCdzZWN0aW9uLXRvZ2dsZScpXG5cblxuXG5cblxuXG4gICAgICAvLyBDbGljayBMaXN0ZW5lclxuICAgICAgLy8gU2NvcGVkIHRvIHRoZSBkb2N1bWVudCwgbWFraW5nIHVzZSBvZiBqUXVlcnkncyBjb252aWVuY2UtYmVoYXZpb3IgXG4gICAgICAvLyB3aGljaCBwcmV2ZW50cyB0aGUgbmVlZCBmb3IgYSBjbG9zdXJlIChvdGhlcndpc2UgbmVlZGVkIHdoZW4gXG4gICAgICAvLyBhdHRhY2hpbmcgZXZlbnQgaGFuZGxlcnMgaW5zaWRlIG9mIGEgbG9vcCwgYXMgSlMgZXZhbHVhdGVzIGZ1bmN0aW9uc1xuICAgICAgLy8gYXQgdGhlIHRpbWUgb2YgZXhlY3V0aW9uKVxuXG4gICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAoJyN0b2dnbGUtJytpKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcylcbiAgICAgICAgXG4gICAgICAgIHVwZGF0ZVRvZ2dsZSgkdGhpcylcblxuICAgICAgfSkgLy8gZW5kIGNsaWNrIGhhbmRsZXIgIFxuXG4gICAgfSkgLy8gZW5kIGxvb3BcblxuXG4gIC8qXG4gIFNldCBmaXJzdCB0byBvcGVuXG4gICovXG5cbiAgdmFyIGZpc3RTZWN0aW9uID0gJCgnI3RvZ2dsZS0wJylcbiAgdXBkYXRlVG9nZ2xlKGZpc3RTZWN0aW9uKVxuXG4gICAgICBcbn1cblxuXG5cblxuXG5cblxuXG5cbnZhciB1cGRhdGVUb2dnbGUgPSBmdW5jdGlvbih0YXJnZXQpIHtcblxuXG4gIC8vIENsb3NlIHByZXZpb3VzbHkgb3BlbiBzZWN0aW9uXG4gICQoJy50b2dnbGUtc2VjdGlvbicpLmF0dHIoJ3N0eWxlJywgJ2hlaWdodDogMCcpXG4gICQoJy5zZWN0aW9uLXRvZ2dsZScpLnJlbW92ZUNsYXNzKCdvcGVuJylcblxuXG4gIC8qXG4gIE9wZW4gY2xpY2tlZCBzZWN0aW9uXG4gICovXG5cbiAgLy8gQWRkIG9wZW4gY2xhc3MgdG8gaGVhZGluZyAod2hpY2ggZWZmZWN0aXZlbHkgY2hhbmdlcyBcbiAgLy8gdGhlIHBsdXMgdG8gYSBtaW51cywgdmlhIHRoZSBjc3MpXG5cbiAgdGFyZ2V0LmFkZENsYXNzKCdvcGVuJylcblxuXG4gIC8vIEdyYWIgdGhlIGNsaWNrZWQgaGVhZGluZydzIGlkXG5cbiAgY3VycmVudElEID0gdGFyZ2V0LmF0dHIoJ2lkJylcbiAgXG5cbiAgLy8gY2FjaGUgdGhlIHNlY3Rpb24gdG8gc2hvdyxcbiAgLy8gc2VsZWN0aW5nIHZpYSB0aGUgZGF0YS10b2dnbGUtdGFyZ2V0LCB3aGljaCBpcyBzZXQgdG8gXG4gIC8vIGl0J3MgcmVzcGVjdGl2ZSBoZWFkaW5nJ3MgaWRcblxuICBzZWN0aW9uVG9TaG93ID0gJCgnW2RhdGEtdG9nZ2xlLXRhcmdldD1cIicrY3VycmVudElEKydcIl0nKVxuXG5cbiAgLy8gZ3JhYiB0aGUgdGFyZ2V0IHNlY3Rpb24ncyBoZWlnaHRcblxuICBzZWN0aW9uSGVpZ2h0ID0gc2VjdGlvblRvU2hvdy5kYXRhKCdoZWlnaHQnKSArICdweCc7XG5cblxuICAvLyBzaG93IGl0XG5cbiAgc2VjdGlvblRvU2hvdy5hdHRyKCdzdHlsZScsICdoZWlnaHQ6ICcrc2VjdGlvbkhlaWdodClcblxuXG59XG5cblxuXG5cblxudmFyIHNldEJ1dHRvbnMgPSBmdW5jdGlvbigpIHtcblxuICBuZXh0QnRucy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIG5leHRJbmRleCA9IGkgKyAxXG5cbiAgICAgIHZhciBuZXh0VGFyZ2V0ID0gJCgnI3RvZ2dsZS0nK25leHRJbmRleClcbiAgICAgIHVwZGF0ZVRvZ2dsZShuZXh0VGFyZ2V0KVxuXG4gICAgfSlcbiAgfSlcblxuICBwcmV2QnRucy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIHByZXZJbmRleCA9IGkgLSAxXG5cbiAgICAgIHZhciBwcmV2VGFyZ2V0ID0gJCgnI3RvZ2dsZS0nK3ByZXZJbmRleClcbiAgICAgIHVwZGF0ZVRvZ2dsZShwcmV2VGFyZ2V0KVxuXG4gICAgfSlcbiAgfSlcblxufVxuXG5cblxudmFyIHJlbW92ZUZpcnN0QW5kTGFzdEJ0bnMgPSBmdW5jdGlvbigpIHtcbiAgcHJldkJ0bnMuZmlyc3QoKS5hZGRDbGFzcygnaGlkZGVuJylcbiAgbmV4dEJ0bnMubGFzdCgpLmFkZENsYXNzKCdoaWRkZW4nKVxufSIsIi8vIHRvZG86IHJlZmFjdG9yIHRoZXNlIGludG8gaGVscGVyIG1vZHVsZShzKVxuXG5cblxuLypcblRvZ2dsZWFibGUgU2VjdGlvbnNcbiovXG5cbnZhciB0b2dnbGVTZWN0aW9ucyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90b2dnbGUtc2VjdGlvbicpXG50b2dnbGVTZWN0aW9ucygpXG5cblxuXG5cbnZhciBoZXhEaWdpdHMgPSBuZXcgQXJyYXkoJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknLCAnYScsICdiJywgJ2MnLCAnZCcsICdlJywgJ2YnKTtcblxudmFyIHJnYjJoZXggPSBmdW5jdGlvbihyZ2IpIHtcbiAgcmdiID0gcmdiLm1hdGNoKC9ecmdiXFwoKFxcZCspLFxccyooXFxkKyksXFxzKihcXGQrKVxcKSQvKTtcbiAgcmV0dXJuICcjJyArIGhleF92YWx1ZShyZ2JbMV0pICsgaGV4X3ZhbHVlKHJnYlsyXSkgKyBoZXhfdmFsdWUocmdiWzNdKTtcbn07XG5cbnZhciBoZXhfdmFsdWUgPSBmdW5jdGlvbih4KSB7XG4gIGlmIChpc05hTih4KSkge1xuICAgIHJldHVybiAnMDAnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBoZXhEaWdpdHNbKHggLSAoeCAlIDE2KSkgLyAxNl0gKyBoZXhEaWdpdHNbeCAlIDE2XTtcbiAgfVxufTtcblxudmFyIGRldGVjdENvbG9ycyA9IGZ1bmN0aW9uKGltYWdlKSB7XG4gIHZhciBjb2xvclRoaWVmLCBkZXRlY3RlZF9jb2xvcnMsIGhleCwgaSwgcmVzdWx0cztcbiAgY29sb3JUaGllZiA9IG5ldyBDb2xvclRoaWVmO1xuICBkZXRlY3RlZF9jb2xvcnMgPSBBcnJheSgpO1xuICBkZXRlY3RlZF9jb2xvcnMgPSBjb2xvclRoaWVmLmdldFBhbGV0dGUoaW1hZ2UsIDUpO1xuICAkKCcucGFsZXR0ZUNvbG9ycycpLmVtcHR5KCk7XG4gIGkgPSBkZXRlY3RlZF9jb2xvcnMubGVuZ3RoIC0gMTtcbiAgcmVzdWx0cyA9IFtdO1xuICB3aGlsZSAoaSA+PSAwKSB7XG4gICAgaGV4ID0gcmdiMmhleCgncmdiKCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMF0gKyAnLCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMV0gKyAnLCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMl0gKyAnKScpO1xuICAgICQoJy5wYWxldHRlQ29sb3JzJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY29sb3JcIiBkYXRhLWhleD1cIicgKyBoZXggKyAnXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoJyArIGRldGVjdGVkX2NvbG9yc1tpXVswXSArICcsJyArIGRldGVjdGVkX2NvbG9yc1tpXVsxXSArICcsJyArIGRldGVjdGVkX2NvbG9yc1tpXVsyXSArICcpO1wiPjwvZGl2PicpO1xuICAgIHJlc3VsdHMucHVzaChpLS0pO1xuICB9XG4gIHJldHVybiByZXN1bHRzO1xufTtcblxuXG5cblxuXG4vKlxuQ29sb3IgUGlja2VyXG5UT0RPOiByZWZhY3RvciB0aGlzIGludG8gYSBtb2R1bGVcbiovXG5cbihmdW5jdGlvbigkKSB7XG5cbiAgLy8gQ09MT1IgUElDS0VSXG4gIHZhciBjb2xvcl9waWNrZXJfb3B0aW9ucyA9IHtcbiAgICBjb250cm9sOiAnd2hlZWwnLFxuICAgIHBvc2l0aW9uOiAncmlnaHQnXG4gIH07XG5cblxuICAvLyBJbml0IGNvbG9ycGlja2Vyc1xuICAkKCcjY29sb3JQaWNrZXIxJykubWluaWNvbG9ycyhjb2xvcl9waWNrZXJfb3B0aW9ucyk7XG4gICQoJyNjb2xvclBpY2tlcjInKS5taW5pY29sb3JzKGNvbG9yX3BpY2tlcl9vcHRpb25zKTtcblxuICAvLyBTZXQgdGhlIGxhc3QgYWN0aXZlIGNvbG9yIHBpY2tlciB3aGVuIGNsaWNrZWRcbiAgd2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlciA9IGZhbHNlO1xuICAkKCcjY29sb3JQaWNrZXIxLCAjY29sb3JQaWNrZXIyJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIgPSAkKHRoaXMpO1xuICB9KTtcbiAgXG4gIC8vIFdoZW4gY2xpY2tpbmcgYSBkZXRlY3RlZCBjb2xvciwgYXBwbHkgaXQgdG8gdGhlIGxhc3Qgc2VsZWN0ZWQgY29sb3JwaWNrZXJcbiAgJCgnLnBhbGV0dGVDb2xvcnMnKS5vbignY2xpY2snLCAnLmNvbG9yJywgZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2cod2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlcik7XG4gICAgaWYgKHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIpIHtcbiAgICAgIHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIudmFsKCQodGhpcykuZGF0YSgnaGV4JykpO1xuICAgICAgcmV0dXJuIHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIubWluaWNvbG9ycygndmFsdWUnLCAkKHRoaXMpLmRhdGEoJ2hleCcpKTtcbiAgICB9XG4gIH0pO1xuICAvLyBDT0xPUiBQSUNLRVJcblxuXG4gIC8vIERldGVjdCB0aGUgY29sb3JzIGZyb20gdGhlIHNhdmVkIGltYWdlIHVzaW5nIGNvbG9ydGhpZWZcbiAgJCgnI3JlZnJlc2hEZXRlY3RlZENvbG9ycycpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgaW1nO1xuICAgIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5zcmMgPSB3aW5kb3cuY3JvcHBlci5nZXREYXRhVVJMKCk7XG4gICAgZGV0ZWN0Q29sb3JzKGltZyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuXG5cbiAgLy8gVXBkYXRlIHRoZSBidXNpbmVzcyBwcmV2aWV3XG4gIHJldHVybiB1cGRhdGVQcmV2aWV3ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRleHQ7XG4gICAgJCgnLnByZXZpZXdIZWFkZXInKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAkKCcjY29sb3JQaWNrZXIxJykudmFsKCkpO1xuICAgICQoJy5jb250ZW50LCAuc29jaWFsRm9vdGVyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJCgnI2NvbG9yUGlja2VyMicpLnZhbCgpKTtcbiAgICAkKCcucHJldmlld0hlYWRlciBpbWcnKS5hdHRyKCdzcmMnLCAkKCcudGhlSW1hZ2UnKS52YWwoKSk7XG4gICAgJCgnLmNvbnRlbnQgaDEnKS5odG1sKCQoJy5idXNpbmVzc05hbWUnKS52YWwoKSk7XG4gICAgdGV4dCA9ICQoJy5hZGRyZXNzJykudmFsKCkgKyAnICcgKyAkKCcuYWRkcmVzczInKS52YWwoKSArICcgJyArICQoJy5jaXR5JykudmFsKCkgKyAnICcgKyAkKCcuc3RhdGUnKS52YWwoKSArICcgJyArICQoJy56aXBDb2RlJykudmFsKCk7XG4gICAgcmV0dXJuICQoJy5jb250ZW50IHAnKS5odG1sKHRleHQpO1xuICB9O1xuXG59KShqUXVlcnkpOyJdfQ==
