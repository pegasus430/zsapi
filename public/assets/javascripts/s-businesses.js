(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*

Toggle Sections

Addordian-like functionality for page sections

Notes:
- transition on height is handled via css

*/





var toggleSections = $('.toggle-section')
var index = 0
var height
var sectionHeight
var sectionToShow
var currentID



module.exports = function() {

  $(window).on("load", function() {

    toggle()
    
  }) // end window.on.load
} // end exports





var toggle = function() {

  toggleSections.each(function() {
      index++
      var section = $(this)


      // Grab height
      // height = section.height()
      // Store it for later use
      // when done... hide sections
      section.attr('data-height', section.height()).promise().done( function() {
        // Collapse all sections
        // section.attr('style', 'height:0')
      })


      // Prepare the section:
      // - add id with the section's index
      section.attr('data-toggle-target', 'toggle-'+index)


      // Prepare the heading:
      // add class (for proper styling)
      // (note: this could be done in advance in the dom, 
      // but I'm unsure if this is worth the effort...
      // as the current rails helper doesn't yet allow for this)
      section.prev().find('h2')
        .attr('id', 'toggle-'+index)
        .addClass('section-toggle')




      // Click Listener
      // Scoped to the document, making use of jQuery's convience-behavior 
      // which prevents the need for a closure (otherwise needed when 
      // attaching event handlers inside of a loop, as JS evaluates functions
      // at the time of execution)

      $(document).on('click', ('#toggle-'+index), function() {
        var $this = $(this)
        
        updateToggle($this)

      }) // end click handler  

    }) // end loop


  /*
  Set first to open
  */

  var fistSection = $('#toggle-1')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy90b2dnbGUtc2VjdGlvbi5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9zLWJ1c2luZXNzZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG5cblRvZ2dsZSBTZWN0aW9uc1xuXG5BZGRvcmRpYW4tbGlrZSBmdW5jdGlvbmFsaXR5IGZvciBwYWdlIHNlY3Rpb25zXG5cbk5vdGVzOlxuLSB0cmFuc2l0aW9uIG9uIGhlaWdodCBpcyBoYW5kbGVkIHZpYSBjc3NcblxuKi9cblxuXG5cblxuXG52YXIgdG9nZ2xlU2VjdGlvbnMgPSAkKCcudG9nZ2xlLXNlY3Rpb24nKVxudmFyIGluZGV4ID0gMFxudmFyIGhlaWdodFxudmFyIHNlY3Rpb25IZWlnaHRcbnZhciBzZWN0aW9uVG9TaG93XG52YXIgY3VycmVudElEXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICB0b2dnbGUoKVxuICAgIFxuICB9KSAvLyBlbmQgd2luZG93Lm9uLmxvYWRcbn0gLy8gZW5kIGV4cG9ydHNcblxuXG5cblxuXG52YXIgdG9nZ2xlID0gZnVuY3Rpb24oKSB7XG5cbiAgdG9nZ2xlU2VjdGlvbnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGluZGV4KytcbiAgICAgIHZhciBzZWN0aW9uID0gJCh0aGlzKVxuXG5cbiAgICAgIC8vIEdyYWIgaGVpZ2h0XG4gICAgICAvLyBoZWlnaHQgPSBzZWN0aW9uLmhlaWdodCgpXG4gICAgICAvLyBTdG9yZSBpdCBmb3IgbGF0ZXIgdXNlXG4gICAgICAvLyB3aGVuIGRvbmUuLi4gaGlkZSBzZWN0aW9uc1xuICAgICAgc2VjdGlvbi5hdHRyKCdkYXRhLWhlaWdodCcsIHNlY3Rpb24uaGVpZ2h0KCkpLnByb21pc2UoKS5kb25lKCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gQ29sbGFwc2UgYWxsIHNlY3Rpb25zXG4gICAgICAgIC8vIHNlY3Rpb24uYXR0cignc3R5bGUnLCAnaGVpZ2h0OjAnKVxuICAgICAgfSlcblxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSBzZWN0aW9uOlxuICAgICAgLy8gLSBhZGQgaWQgd2l0aCB0aGUgc2VjdGlvbidzIGluZGV4XG4gICAgICBzZWN0aW9uLmF0dHIoJ2RhdGEtdG9nZ2xlLXRhcmdldCcsICd0b2dnbGUtJytpbmRleClcblxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSBoZWFkaW5nOlxuICAgICAgLy8gYWRkIGNsYXNzIChmb3IgcHJvcGVyIHN0eWxpbmcpXG4gICAgICAvLyAobm90ZTogdGhpcyBjb3VsZCBiZSBkb25lIGluIGFkdmFuY2UgaW4gdGhlIGRvbSwgXG4gICAgICAvLyBidXQgSSdtIHVuc3VyZSBpZiB0aGlzIGlzIHdvcnRoIHRoZSBlZmZvcnQuLi5cbiAgICAgIC8vIGFzIHRoZSBjdXJyZW50IHJhaWxzIGhlbHBlciBkb2Vzbid0IHlldCBhbGxvdyBmb3IgdGhpcylcbiAgICAgIHNlY3Rpb24ucHJldigpLmZpbmQoJ2gyJylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ3RvZ2dsZS0nK2luZGV4KVxuICAgICAgICAuYWRkQ2xhc3MoJ3NlY3Rpb24tdG9nZ2xlJylcblxuXG5cblxuICAgICAgLy8gQ2xpY2sgTGlzdGVuZXJcbiAgICAgIC8vIFNjb3BlZCB0byB0aGUgZG9jdW1lbnQsIG1ha2luZyB1c2Ugb2YgalF1ZXJ5J3MgY29udmllbmNlLWJlaGF2aW9yIFxuICAgICAgLy8gd2hpY2ggcHJldmVudHMgdGhlIG5lZWQgZm9yIGEgY2xvc3VyZSAob3RoZXJ3aXNlIG5lZWRlZCB3aGVuIFxuICAgICAgLy8gYXR0YWNoaW5nIGV2ZW50IGhhbmRsZXJzIGluc2lkZSBvZiBhIGxvb3AsIGFzIEpTIGV2YWx1YXRlcyBmdW5jdGlvbnNcbiAgICAgIC8vIGF0IHRoZSB0aW1lIG9mIGV4ZWN1dGlvbilcblxuICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgKCcjdG9nZ2xlLScraW5kZXgpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgICBcbiAgICAgICAgdXBkYXRlVG9nZ2xlKCR0aGlzKVxuXG4gICAgICB9KSAvLyBlbmQgY2xpY2sgaGFuZGxlciAgXG5cbiAgICB9KSAvLyBlbmQgbG9vcFxuXG5cbiAgLypcbiAgU2V0IGZpcnN0IHRvIG9wZW5cbiAgKi9cblxuICB2YXIgZmlzdFNlY3Rpb24gPSAkKCcjdG9nZ2xlLTEnKVxuICB1cGRhdGVUb2dnbGUoZmlzdFNlY3Rpb24pXG5cbiAgICAgIFxufVxuXG5cblxuXG5cblxuXG5cblxudmFyIHVwZGF0ZVRvZ2dsZSA9IGZ1bmN0aW9uKHRhcmdldCkge1xuXG5cbiAgLy8gQ2xvc2UgcHJldmlvdXNseSBvcGVuIHNlY3Rpb25cbiAgJCgnLnRvZ2dsZS1zZWN0aW9uJykuYXR0cignc3R5bGUnLCAnaGVpZ2h0OiAwJylcbiAgJCgnLnNlY3Rpb24tdG9nZ2xlJykucmVtb3ZlQ2xhc3MoJ29wZW4nKVxuXG5cbiAgLypcbiAgT3BlbiBjbGlja2VkIHNlY3Rpb25cbiAgKi9cblxuICAvLyBBZGQgb3BlbiBjbGFzcyB0byBoZWFkaW5nICh3aGljaCBlZmZlY3RpdmVseSBjaGFuZ2VzIFxuICAvLyB0aGUgcGx1cyB0byBhIG1pbnVzLCB2aWEgdGhlIGNzcylcblxuICB0YXJnZXQuYWRkQ2xhc3MoJ29wZW4nKVxuXG5cbiAgLy8gR3JhYiB0aGUgY2xpY2tlZCBoZWFkaW5nJ3MgaWRcblxuICBjdXJyZW50SUQgPSB0YXJnZXQuYXR0cignaWQnKVxuICBcblxuICAvLyBjYWNoZSB0aGUgc2VjdGlvbiB0byBzaG93LFxuICAvLyBzZWxlY3RpbmcgdmlhIHRoZSBkYXRhLXRvZ2dsZS10YXJnZXQsIHdoaWNoIGlzIHNldCB0byBcbiAgLy8gaXQncyByZXNwZWN0aXZlIGhlYWRpbmcncyBpZFxuXG4gIHNlY3Rpb25Ub1Nob3cgPSAkKCdbZGF0YS10b2dnbGUtdGFyZ2V0PVwiJytjdXJyZW50SUQrJ1wiXScpXG5cblxuICAvLyBncmFiIHRoZSB0YXJnZXQgc2VjdGlvbidzIGhlaWdodFxuXG4gIHNlY3Rpb25IZWlnaHQgPSBzZWN0aW9uVG9TaG93LmRhdGEoJ2hlaWdodCcpICsgJ3B4JztcblxuXG4gIC8vIHNob3cgaXRcblxuICBzZWN0aW9uVG9TaG93LmF0dHIoJ3N0eWxlJywgJ2hlaWdodDogJytzZWN0aW9uSGVpZ2h0KVxuXG5cbn0iLCIvLyB0b2RvOiByZWZhY3RvciB0aGVzZSBpbnRvIGhlbHBlciBtb2R1bGUocylcblxuXG5cbi8qXG5Ub2dnbGVhYmxlIFNlY3Rpb25zXG4qL1xuXG52YXIgdG9nZ2xlU2VjdGlvbnMgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdG9nZ2xlLXNlY3Rpb24nKVxudG9nZ2xlU2VjdGlvbnMoKVxuXG5cblxuXG52YXIgaGV4RGlnaXRzID0gbmV3IEFycmF5KCcwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJyk7XG5cbnZhciByZ2IyaGV4ID0gZnVuY3Rpb24ocmdiKSB7XG4gIHJnYiA9IHJnYi5tYXRjaCgvXnJnYlxcKChcXGQrKSxcXHMqKFxcZCspLFxccyooXFxkKylcXCkkLyk7XG4gIHJldHVybiAnIycgKyBoZXhfdmFsdWUocmdiWzFdKSArIGhleF92YWx1ZShyZ2JbMl0pICsgaGV4X3ZhbHVlKHJnYlszXSk7XG59O1xuXG52YXIgaGV4X3ZhbHVlID0gZnVuY3Rpb24oeCkge1xuICBpZiAoaXNOYU4oeCkpIHtcbiAgICByZXR1cm4gJzAwJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaGV4RGlnaXRzWyh4IC0gKHggJSAxNikpIC8gMTZdICsgaGV4RGlnaXRzW3ggJSAxNl07XG4gIH1cbn07XG5cbnZhciBkZXRlY3RDb2xvcnMgPSBmdW5jdGlvbihpbWFnZSkge1xuICB2YXIgY29sb3JUaGllZiwgZGV0ZWN0ZWRfY29sb3JzLCBoZXgsIGksIHJlc3VsdHM7XG4gIGNvbG9yVGhpZWYgPSBuZXcgQ29sb3JUaGllZjtcbiAgZGV0ZWN0ZWRfY29sb3JzID0gQXJyYXkoKTtcbiAgZGV0ZWN0ZWRfY29sb3JzID0gY29sb3JUaGllZi5nZXRQYWxldHRlKGltYWdlLCA1KTtcbiAgJCgnLnBhbGV0dGVDb2xvcnMnKS5lbXB0eSgpO1xuICBpID0gZGV0ZWN0ZWRfY29sb3JzLmxlbmd0aCAtIDE7XG4gIHJlc3VsdHMgPSBbXTtcbiAgd2hpbGUgKGkgPj0gMCkge1xuICAgIGhleCA9IHJnYjJoZXgoJ3JnYignICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzBdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzFdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzJdICsgJyknKTtcbiAgICAkKCcucGFsZXR0ZUNvbG9ycycpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImNvbG9yXCIgZGF0YS1oZXg9XCInICsgaGV4ICsgJ1wiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogcmdiKCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMF0gKyAnLCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMV0gKyAnLCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMl0gKyAnKTtcIj48L2Rpdj4nKTtcbiAgICByZXN1bHRzLnB1c2goaS0tKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cblxuXG5cblxuLypcbkNvbG9yIFBpY2tlclxuVE9ETzogcmVmYWN0b3IgdGhpcyBpbnRvIGEgbW9kdWxlXG4qL1xuXG4oZnVuY3Rpb24oJCkge1xuXG4gIC8vIENPTE9SIFBJQ0tFUlxuICB2YXIgY29sb3JfcGlja2VyX29wdGlvbnMgPSB7XG4gICAgY29udHJvbDogJ3doZWVsJyxcbiAgICBwb3NpdGlvbjogJ3JpZ2h0J1xuICB9O1xuXG5cbiAgLy8gSW5pdCBjb2xvcnBpY2tlcnNcbiAgJCgnI2NvbG9yUGlja2VyMScpLm1pbmljb2xvcnMoY29sb3JfcGlja2VyX29wdGlvbnMpO1xuICAkKCcjY29sb3JQaWNrZXIyJykubWluaWNvbG9ycyhjb2xvcl9waWNrZXJfb3B0aW9ucyk7XG5cbiAgLy8gU2V0IHRoZSBsYXN0IGFjdGl2ZSBjb2xvciBwaWNrZXIgd2hlbiBjbGlja2VkXG4gIHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIgPSBmYWxzZTtcbiAgJCgnI2NvbG9yUGlja2VyMSwgI2NvbG9yUGlja2VyMicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyID0gJCh0aGlzKTtcbiAgfSk7XG4gIFxuICAvLyBXaGVuIGNsaWNraW5nIGEgZGV0ZWN0ZWQgY29sb3IsIGFwcGx5IGl0IHRvIHRoZSBsYXN0IHNlbGVjdGVkIGNvbG9ycGlja2VyXG4gICQoJy5wYWxldHRlQ29sb3JzJykub24oJ2NsaWNrJywgJy5jb2xvcicsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIpO1xuICAgIGlmICh3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyKSB7XG4gICAgICB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyLnZhbCgkKHRoaXMpLmRhdGEoJ2hleCcpKTtcbiAgICAgIHJldHVybiB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyLm1pbmljb2xvcnMoJ3ZhbHVlJywgJCh0aGlzKS5kYXRhKCdoZXgnKSk7XG4gICAgfVxuICB9KTtcbiAgLy8gQ09MT1IgUElDS0VSXG5cblxuICAvLyBEZXRlY3QgdGhlIGNvbG9ycyBmcm9tIHRoZSBzYXZlZCBpbWFnZSB1c2luZyBjb2xvcnRoaWVmXG4gICQoJyNyZWZyZXNoRGV0ZWN0ZWRDb2xvcnMnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgdmFyIGltZztcbiAgICBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gd2luZG93LmNyb3BwZXIuZ2V0RGF0YVVSTCgpO1xuICAgIGRldGVjdENvbG9ycyhpbWcpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuXG4gIC8vIFVwZGF0ZSB0aGUgYnVzaW5lc3MgcHJldmlld1xuICByZXR1cm4gdXBkYXRlUHJldmlldyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0ZXh0O1xuICAgICQoJy5wcmV2aWV3SGVhZGVyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJCgnI2NvbG9yUGlja2VyMScpLnZhbCgpKTtcbiAgICAkKCcuY29udGVudCwgLnNvY2lhbEZvb3RlcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICQoJyNjb2xvclBpY2tlcjInKS52YWwoKSk7XG4gICAgJCgnLnByZXZpZXdIZWFkZXIgaW1nJykuYXR0cignc3JjJywgJCgnLnRoZUltYWdlJykudmFsKCkpO1xuICAgICQoJy5jb250ZW50IGgxJykuaHRtbCgkKCcuYnVzaW5lc3NOYW1lJykudmFsKCkpO1xuICAgIHRleHQgPSAkKCcuYWRkcmVzcycpLnZhbCgpICsgJyAnICsgJCgnLmFkZHJlc3MyJykudmFsKCkgKyAnICcgKyAkKCcuY2l0eScpLnZhbCgpICsgJyAnICsgJCgnLnN0YXRlJykudmFsKCkgKyAnICcgKyAkKCcuemlwQ29kZScpLnZhbCgpO1xuICAgIHJldHVybiAkKCcuY29udGVudCBwJykuaHRtbCh0ZXh0KTtcbiAgfTtcblxufSkoalF1ZXJ5KTsiXX0=
