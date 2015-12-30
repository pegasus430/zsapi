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
var nextIndex
var nextTarget
var preIndex
var prevTarget



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

      nextTarget = $('#toggle-'+nextIndex)
      updateToggle(nextTarget)

    })
  })

  prevBtns.each(function(i) {
    $(this).on('click', function(e) {

      e.preventDefault()

      prevIndex = i - 1

      prevTarget = $('#toggle-'+prevIndex)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy90b2dnbGUtc2VjdGlvbi5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9zLWJ1c2luZXNzZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ROQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG5cblRvZ2dsZSBTZWN0aW9uc1xuXG5BZGRvcmRpYW4tbGlrZSBmdW5jdGlvbmFsaXR5IGZvciBwYWdlIHNlY3Rpb25zXG5cbk5vdGVzOlxuLSB0cmFuc2l0aW9uIG9uIGhlaWdodCBpcyBoYW5kbGVkIHZpYSBjc3NcblxuKi9cblxuXG5cblxuXG52YXIgdG9nZ2xlU2VjdGlvbnMgPSAkKCcudG9nZ2xlLXNlY3Rpb24nKVxudmFyIGhlaWdodFxudmFyIHNlY3Rpb25IZWlnaHRcbnZhciBzZWN0aW9uVG9TaG93XG52YXIgY3VycmVudElEXG52YXIgbmV4dEJ0bnMgPSAkKCcudG9nZ2xlLXNlY3Rpb25fYnRuLW5leHQnKVxudmFyIHByZXZCdG5zID0gJCgnLnRvZ2dsZS1zZWN0aW9uX2J0bi1wcmV2JylcbnZhciBuZXh0SW5kZXhcbnZhciBuZXh0VGFyZ2V0XG52YXIgcHJlSW5kZXhcbnZhciBwcmV2VGFyZ2V0XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIEZpcnN0LCByZW1vdmUgZmlyc3QgYW5kIGxhc3QgYnRuc1xuXG4gIHJlbW92ZUZpcnN0QW5kTGFzdEJ0bnMoKSBcblxuXG4gIC8vIE9uY2UgaW1hZ2VzIGhhdmUgbG9hZGVkLCBzZXQgdGhlIHRvZ2dsZVxuICAvLyBzZWN0aW9uc1xuXG4gICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICB0b2dnbGUoKVxuXG4gIH0pXG5cblxuICAvLyBTZXQgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZSBuZXh0L3ByZXYgYnRuc1xuXG4gIHNldEJ1dHRvbnMoKVxuXG59IC8vIGVuZCBleHBvcnRzXG5cblxuLy8gJChcIiNmaXJzdFwiKS5hbmltYXRlKHtoZWlnaHQ6ICQoXCIjZmlyc3RcIikuZ2V0KDApLnNjcm9sbEhlaWdodH0sIDEwMDAgKTtcblxudmFyIHRvZ2dsZSA9IGZ1bmN0aW9uKCkge1xuXG5cbiAgdG9nZ2xlU2VjdGlvbnMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICB2YXIgc2VjdGlvbiA9ICQodGhpcylcblxuXG4gICAgICAvLyBIZWlnaHQgaXMgc2V0IHRvIDAgaW4gY3NzXG4gICAgICAvLyBieSB1c2luZyB0aGUgaW5jcmVkaWJseSBuaWZmdHkgc2Nyb2xsSGVpZ2h0LCBcbiAgICAgIC8vIHdlIGNhbiBnZXQgdGhlIGhlaWdodCBhbnl3YXlzIFxuICAgICAgLy8gc2VlOiBcbiAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTAwMzIyMC9qYXZhc2NyaXB0LWpxdWVyeS1hbmltYXRlLXRvLWF1dG8taGVpZ2h0I2Fuc3dlci0yNDc2Mjg0OFxuICAgICAgaGVpZ2h0ID0gc2VjdGlvbi5nZXQoMCkuc2Nyb2xsSGVpZ2h0XG5cbiAgICAgIHNlY3Rpb24uYXR0cignZGF0YS1oZWlnaHQnLCBoZWlnaHQpXG4gICAgICAvLyBTZXQgaGVpZ2h0IG9uIGRhdGEgYXR0cmlidXRlXG4gICAgICAvLyBoZWlnaHQgPSBzZWN0aW9uLmhlaWdodCgpXG4gICAgICAvLyBTdG9yZSBpdCBmb3IgbGF0ZXIgdXNlXG4gICAgICAvLyB3aGVuIGRvbmUuLi4gaGlkZSBzZWN0aW9uc1xuICAgICAgLy8gc2VjdGlvbi5hdHRyKCdkYXRhLWhlaWdodCcsIHNlY3Rpb24uaGVpZ2h0KCkpLnByb21pc2UoKS5kb25lKCBmdW5jdGlvbigpIHtcbiAgICAgIC8vICAgLy8gQ29sbGFwc2UgYWxsIHNlY3Rpb25zXG4gICAgICAvLyAgIHNlY3Rpb24uYXR0cignc3R5bGUnLCAnaGVpZ2h0OjAnKVxuICAgICAgLy8gfSlcblxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSBzZWN0aW9uOlxuICAgICAgLy8gLSBhZGQgaWQgd2l0aCB0aGUgc2VjdGlvbidzIGluZGV4XG4gICAgICBzZWN0aW9uLmF0dHIoJ2RhdGEtdG9nZ2xlLXRhcmdldCcsICd0b2dnbGUtJytpKVxuXG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIGhlYWRpbmc6XG4gICAgICAvLyBhZGQgY2xhc3MgKGZvciBwcm9wZXIgc3R5bGluZylcbiAgICAgIC8vIChub3RlOiB0aGlzIGNvdWxkIGJlIGRvbmUgaW4gYWR2YW5jZSBpbiB0aGUgZG9tLCBcbiAgICAgIC8vIGJ1dCBJJ20gdW5zdXJlIGlmIHRoaXMgaXMgd29ydGggdGhlIGVmZm9ydC4uLlxuICAgICAgLy8gYXMgdGhlIGN1cnJlbnQgcmFpbHMgaGVscGVyIGRvZXNuJ3QgeWV0IGFsbG93IGZvciB0aGlzKVxuICAgICAgc2VjdGlvbi5wcmV2KCkuZmluZCgnaDInKVxuICAgICAgICAuYXR0cignaWQnLCAndG9nZ2xlLScraSlcbiAgICAgICAgLmFkZENsYXNzKCdzZWN0aW9uLXRvZ2dsZScpXG5cblxuXG5cblxuXG4gICAgICAvLyBDbGljayBMaXN0ZW5lclxuICAgICAgLy8gU2NvcGVkIHRvIHRoZSBkb2N1bWVudCwgbWFraW5nIHVzZSBvZiBqUXVlcnkncyBjb252aWVuY2UtYmVoYXZpb3IgXG4gICAgICAvLyB3aGljaCBwcmV2ZW50cyB0aGUgbmVlZCBmb3IgYSBjbG9zdXJlIChvdGhlcndpc2UgbmVlZGVkIHdoZW4gXG4gICAgICAvLyBhdHRhY2hpbmcgZXZlbnQgaGFuZGxlcnMgaW5zaWRlIG9mIGEgbG9vcCwgYXMgSlMgZXZhbHVhdGVzIGZ1bmN0aW9uc1xuICAgICAgLy8gYXQgdGhlIHRpbWUgb2YgZXhlY3V0aW9uKVxuXG4gICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAoJyN0b2dnbGUtJytpKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcylcbiAgICAgICAgXG4gICAgICAgIHVwZGF0ZVRvZ2dsZSgkdGhpcylcblxuICAgICAgfSkgLy8gZW5kIGNsaWNrIGhhbmRsZXIgIFxuXG4gICAgfSkgLy8gZW5kIGxvb3BcblxuXG4gIC8qXG4gIFNldCBmaXJzdCB0byBvcGVuXG4gICovXG5cbiAgdmFyIGZpc3RTZWN0aW9uID0gJCgnI3RvZ2dsZS0wJylcbiAgdXBkYXRlVG9nZ2xlKGZpc3RTZWN0aW9uKVxuXG4gICAgICBcbn1cblxuXG5cblxuXG5cblxuXG5cbnZhciB1cGRhdGVUb2dnbGUgPSBmdW5jdGlvbih0YXJnZXQpIHtcblxuXG4gIC8vIENsb3NlIHByZXZpb3VzbHkgb3BlbiBzZWN0aW9uXG4gICQoJy50b2dnbGUtc2VjdGlvbicpLmF0dHIoJ3N0eWxlJywgJ2hlaWdodDogMCcpXG4gICQoJy5zZWN0aW9uLXRvZ2dsZScpLnJlbW92ZUNsYXNzKCdvcGVuJylcblxuXG4gIC8qXG4gIE9wZW4gY2xpY2tlZCBzZWN0aW9uXG4gICovXG5cbiAgLy8gQWRkIG9wZW4gY2xhc3MgdG8gaGVhZGluZyAod2hpY2ggZWZmZWN0aXZlbHkgY2hhbmdlcyBcbiAgLy8gdGhlIHBsdXMgdG8gYSBtaW51cywgdmlhIHRoZSBjc3MpXG5cbiAgdGFyZ2V0LmFkZENsYXNzKCdvcGVuJylcblxuXG4gIC8vIEdyYWIgdGhlIGNsaWNrZWQgaGVhZGluZydzIGlkXG5cbiAgY3VycmVudElEID0gdGFyZ2V0LmF0dHIoJ2lkJylcbiAgXG5cbiAgLy8gY2FjaGUgdGhlIHNlY3Rpb24gdG8gc2hvdyxcbiAgLy8gc2VsZWN0aW5nIHZpYSB0aGUgZGF0YS10b2dnbGUtdGFyZ2V0LCB3aGljaCBpcyBzZXQgdG8gXG4gIC8vIGl0J3MgcmVzcGVjdGl2ZSBoZWFkaW5nJ3MgaWRcblxuICBzZWN0aW9uVG9TaG93ID0gJCgnW2RhdGEtdG9nZ2xlLXRhcmdldD1cIicrY3VycmVudElEKydcIl0nKVxuXG5cbiAgLy8gZ3JhYiB0aGUgdGFyZ2V0IHNlY3Rpb24ncyBoZWlnaHRcblxuICBzZWN0aW9uSGVpZ2h0ID0gc2VjdGlvblRvU2hvdy5kYXRhKCdoZWlnaHQnKSArICdweCc7XG5cblxuICAvLyBzaG93IGl0XG5cbiAgc2VjdGlvblRvU2hvdy5hdHRyKCdzdHlsZScsICdoZWlnaHQ6ICcrc2VjdGlvbkhlaWdodClcblxuXG59XG5cblxuXG5cblxudmFyIHNldEJ1dHRvbnMgPSBmdW5jdGlvbigpIHtcblxuICBuZXh0QnRucy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIG5leHRJbmRleCA9IGkgKyAxXG5cbiAgICAgIG5leHRUYXJnZXQgPSAkKCcjdG9nZ2xlLScrbmV4dEluZGV4KVxuICAgICAgdXBkYXRlVG9nZ2xlKG5leHRUYXJnZXQpXG5cbiAgICB9KVxuICB9KVxuXG4gIHByZXZCdG5zLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgcHJldkluZGV4ID0gaSAtIDFcblxuICAgICAgcHJldlRhcmdldCA9ICQoJyN0b2dnbGUtJytwcmV2SW5kZXgpXG4gICAgICB1cGRhdGVUb2dnbGUocHJldlRhcmdldClcblxuICAgIH0pXG4gIH0pXG5cbn1cblxuXG5cbnZhciByZW1vdmVGaXJzdEFuZExhc3RCdG5zID0gZnVuY3Rpb24oKSB7XG4gIHByZXZCdG5zLmZpcnN0KCkuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gIG5leHRCdG5zLmxhc3QoKS5hZGRDbGFzcygnaGlkZGVuJylcbn0iLCIvLyB0b2RvOiByZWZhY3RvciB0aGVzZSBpbnRvIGhlbHBlciBtb2R1bGUocylcblxuXG5cbi8qXG5Ub2dnbGVhYmxlIFNlY3Rpb25zXG4qL1xuXG52YXIgdG9nZ2xlU2VjdGlvbnMgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdG9nZ2xlLXNlY3Rpb24nKVxudG9nZ2xlU2VjdGlvbnMoKVxuXG5cblxuXG52YXIgaGV4RGlnaXRzID0gbmV3IEFycmF5KCcwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJyk7XG5cbnZhciByZ2IyaGV4ID0gZnVuY3Rpb24ocmdiKSB7XG4gIHJnYiA9IHJnYi5tYXRjaCgvXnJnYlxcKChcXGQrKSxcXHMqKFxcZCspLFxccyooXFxkKylcXCkkLyk7XG4gIHJldHVybiAnIycgKyBoZXhfdmFsdWUocmdiWzFdKSArIGhleF92YWx1ZShyZ2JbMl0pICsgaGV4X3ZhbHVlKHJnYlszXSk7XG59O1xuXG52YXIgaGV4X3ZhbHVlID0gZnVuY3Rpb24oeCkge1xuICBpZiAoaXNOYU4oeCkpIHtcbiAgICByZXR1cm4gJzAwJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaGV4RGlnaXRzWyh4IC0gKHggJSAxNikpIC8gMTZdICsgaGV4RGlnaXRzW3ggJSAxNl07XG4gIH1cbn07XG5cbnZhciBkZXRlY3RDb2xvcnMgPSBmdW5jdGlvbihpbWFnZSkge1xuICB2YXIgY29sb3JUaGllZiwgZGV0ZWN0ZWRfY29sb3JzLCBoZXgsIGksIHJlc3VsdHM7XG4gIGNvbG9yVGhpZWYgPSBuZXcgQ29sb3JUaGllZjtcbiAgZGV0ZWN0ZWRfY29sb3JzID0gQXJyYXkoKTtcbiAgZGV0ZWN0ZWRfY29sb3JzID0gY29sb3JUaGllZi5nZXRQYWxldHRlKGltYWdlLCA1KTtcbiAgJCgnLnBhbGV0dGVDb2xvcnMnKS5lbXB0eSgpO1xuICBpID0gZGV0ZWN0ZWRfY29sb3JzLmxlbmd0aCAtIDE7XG4gIHJlc3VsdHMgPSBbXTtcbiAgd2hpbGUgKGkgPj0gMCkge1xuICAgIGhleCA9IHJnYjJoZXgoJ3JnYignICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzBdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzFdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzJdICsgJyknKTtcbiAgICAkKCcucGFsZXR0ZUNvbG9ycycpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImNvbG9yXCIgZGF0YS1oZXg9XCInICsgaGV4ICsgJ1wiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogcmdiKCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMF0gKyAnLCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMV0gKyAnLCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMl0gKyAnKTtcIj48L2Rpdj4nKTtcbiAgICByZXN1bHRzLnB1c2goaS0tKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cblxuXG5cblxuLypcbkNvbG9yIFBpY2tlclxuVE9ETzogcmVmYWN0b3IgdGhpcyBpbnRvIGEgbW9kdWxlXG4qL1xuXG4oZnVuY3Rpb24oJCkge1xuXG4gIC8vIENPTE9SIFBJQ0tFUlxuICB2YXIgY29sb3JfcGlja2VyX29wdGlvbnMgPSB7XG4gICAgY29udHJvbDogJ3doZWVsJyxcbiAgICBwb3NpdGlvbjogJ3JpZ2h0J1xuICB9O1xuXG5cbiAgLy8gSW5pdCBjb2xvcnBpY2tlcnNcbiAgJCgnI2NvbG9yUGlja2VyMScpLm1pbmljb2xvcnMoY29sb3JfcGlja2VyX29wdGlvbnMpO1xuICAkKCcjY29sb3JQaWNrZXIyJykubWluaWNvbG9ycyhjb2xvcl9waWNrZXJfb3B0aW9ucyk7XG5cbiAgLy8gU2V0IHRoZSBsYXN0IGFjdGl2ZSBjb2xvciBwaWNrZXIgd2hlbiBjbGlja2VkXG4gIHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIgPSBmYWxzZTtcbiAgJCgnI2NvbG9yUGlja2VyMSwgI2NvbG9yUGlja2VyMicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyID0gJCh0aGlzKTtcbiAgfSk7XG4gIFxuICAvLyBXaGVuIGNsaWNraW5nIGEgZGV0ZWN0ZWQgY29sb3IsIGFwcGx5IGl0IHRvIHRoZSBsYXN0IHNlbGVjdGVkIGNvbG9ycGlja2VyXG4gICQoJy5wYWxldHRlQ29sb3JzJykub24oJ2NsaWNrJywgJy5jb2xvcicsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIpO1xuICAgIGlmICh3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyKSB7XG4gICAgICB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyLnZhbCgkKHRoaXMpLmRhdGEoJ2hleCcpKTtcbiAgICAgIHJldHVybiB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyLm1pbmljb2xvcnMoJ3ZhbHVlJywgJCh0aGlzKS5kYXRhKCdoZXgnKSk7XG4gICAgfVxuICB9KTtcbiAgLy8gQ09MT1IgUElDS0VSXG5cblxuICAvLyBEZXRlY3QgdGhlIGNvbG9ycyBmcm9tIHRoZSBzYXZlZCBpbWFnZSB1c2luZyBjb2xvcnRoaWVmXG4gICQoJyNyZWZyZXNoRGV0ZWN0ZWRDb2xvcnMnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgdmFyIGltZztcbiAgICBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gd2luZG93LmNyb3BwZXIuZ2V0RGF0YVVSTCgpO1xuICAgIGRldGVjdENvbG9ycyhpbWcpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuXG4gIC8vIFVwZGF0ZSB0aGUgYnVzaW5lc3MgcHJldmlld1xuICByZXR1cm4gdXBkYXRlUHJldmlldyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0ZXh0O1xuICAgICQoJy5wcmV2aWV3SGVhZGVyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJCgnI2NvbG9yUGlja2VyMScpLnZhbCgpKTtcbiAgICAkKCcuY29udGVudCwgLnNvY2lhbEZvb3RlcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICQoJyNjb2xvclBpY2tlcjInKS52YWwoKSk7XG4gICAgJCgnLnByZXZpZXdIZWFkZXIgaW1nJykuYXR0cignc3JjJywgJCgnLnRoZUltYWdlJykudmFsKCkpO1xuICAgICQoJy5jb250ZW50IGgxJykuaHRtbCgkKCcuYnVzaW5lc3NOYW1lJykudmFsKCkpO1xuICAgIHRleHQgPSAkKCcuYWRkcmVzcycpLnZhbCgpICsgJyAnICsgJCgnLmFkZHJlc3MyJykudmFsKCkgKyAnICcgKyAkKCcuY2l0eScpLnZhbCgpICsgJyAnICsgJCgnLnN0YXRlJykudmFsKCkgKyAnICcgKyAkKCcuemlwQ29kZScpLnZhbCgpO1xuICAgIHJldHVybiAkKCcuY29udGVudCBwJykuaHRtbCh0ZXh0KTtcbiAgfTtcblxufSkoalF1ZXJ5KTsiXX0=
