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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy90b2dnbGUtc2VjdGlvbi5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9zLWJ1c2luZXNzZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG5cblRvZ2dsZSBTZWN0aW9uc1xuXG5BZGRvcmRpYW4tbGlrZSBmdW5jdGlvbmFsaXR5IGZvciBwYWdlIHNlY3Rpb25zXG5cbk5vdGVzOlxuLSB0cmFuc2l0aW9uIG9uIGhlaWdodCBpcyBoYW5kbGVkIHZpYSBjc3NcblxuKi9cblxuXG5cblxuXG52YXIgdG9nZ2xlU2VjdGlvbnMgPSAkKCcudG9nZ2xlLXNlY3Rpb24nKVxudmFyIGluZGV4ID0gMFxudmFyIGhlaWdodFxudmFyIHNlY3Rpb25IZWlnaHRcbnZhciBzZWN0aW9uVG9TaG93XG52YXIgY3VycmVudElEXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICB0b2dnbGUoKVxuICAgIFxuICB9KSAvLyBlbmQgd2luZG93Lm9uLmxvYWRcbn0gLy8gZW5kIGV4cG9ydHNcblxuXG5cblxuXG52YXIgdG9nZ2xlID0gZnVuY3Rpb24oKSB7XG5cbiAgdG9nZ2xlU2VjdGlvbnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGluZGV4KytcbiAgICAgIHZhciBzZWN0aW9uID0gJCh0aGlzKVxuXG5cbiAgICAgIC8vIEdyYWIgaGVpZ2h0XG4gICAgICAvLyBoZWlnaHQgPSBzZWN0aW9uLmhlaWdodCgpXG4gICAgICAvLyBTdG9yZSBpdCBmb3IgbGF0ZXIgdXNlXG4gICAgICAvLyB3aGVuIGRvbmUuLi4gaGlkZSBzZWN0aW9uc1xuICAgICAgc2VjdGlvbi5hdHRyKCdkYXRhLWhlaWdodCcsIHNlY3Rpb24uaGVpZ2h0KCkpLnByb21pc2UoKS5kb25lKCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gQ29sbGFwc2UgYWxsIHNlY3Rpb25zXG4gICAgICAgIC8vIHNlY3Rpb24uYXR0cignc3R5bGUnLCAnaGVpZ2h0OjAnKVxuICAgICAgfSlcblxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSBzZWN0aW9uOlxuICAgICAgLy8gLSBhZGQgaWQgd2l0aCB0aGUgc2VjdGlvbidzIGluZGV4XG4gICAgICBzZWN0aW9uLmF0dHIoJ2RhdGEtdG9nZ2xlLXRhcmdldCcsICd0b2dnbGUtJytpbmRleClcblxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSBoZWFkaW5nOlxuICAgICAgLy8gYWRkIGNsYXNzIChmb3IgcHJvcGVyIHN0eWxpbmcpXG4gICAgICAvLyAobm90ZTogdGhpcyBjb3VsZCBiZSBkb25lIGluIGFkdmFuY2UgaW4gdGhlIGRvbSwgXG4gICAgICAvLyBidXQgSSdtIHVuc3VyZSBpZiB0aGlzIGlzIHdvcnRoIHRoZSBlZmZvcnQuLi5cbiAgICAgIC8vIGFzIHRoZSBjdXJyZW50IHJhaWxzIGhlbHBlciBkb2Vzbid0IHlldCBhbGxvdyBmb3IgdGhpcylcbiAgICAgIHNlY3Rpb24ucHJldigpLmZpbmQoJ2gyJylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ3RvZ2dsZS0nK2luZGV4KVxuICAgICAgICAuYWRkQ2xhc3MoJ3NlY3Rpb24tdG9nZ2xlJylcblxuXG5cblxuICAgICAgLy8gQ2xpY2sgTGlzdGVuZXJcbiAgICAgIC8vIFNjb3BlZCB0byB0aGUgZG9jdW1lbnQsIG1ha2luZyB1c2Ugb2YgalF1ZXJ5J3MgY29udmllbmNlLWJlaGF2aW9yIFxuICAgICAgLy8gd2hpY2ggcHJldmVudHMgdGhlIG5lZWQgZm9yIGEgY2xvc3VyZSAob3RoZXJ3aXNlIG5lZWRlZCB3aGVuIFxuICAgICAgLy8gYXR0YWNoaW5nIGV2ZW50IGhhbmRsZXJzIGluc2lkZSBvZiBhIGxvb3AsIGFzIEpTIGV2YWx1YXRlcyBmdW5jdGlvbnNcbiAgICAgIC8vIGF0IHRoZSB0aW1lIG9mIGV4ZWN1dGlvbilcblxuICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgKCcjdG9nZ2xlLScraW5kZXgpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgICBcbiAgICAgICAgdXBkYXRlVG9nZ2xlKCR0aGlzKVxuXG4gICAgICB9KSAvLyBlbmQgY2xpY2sgaGFuZGxlciAgXG5cbiAgICB9KSAvLyBlbmQgbG9vcFxuXG5cbiAgLypcbiAgU2V0IGZpcnN0IHRvIG9wZW5cbiAgKi9cblxuICB2YXIgZmlzdFNlY3Rpb24gPSAkKCcjdG9nZ2xlLTEnKVxuICB1cGRhdGVUb2dnbGUoZmlzdFNlY3Rpb24pXG5cbiAgICAgIFxufVxuXG5cblxuXG5cblxuXG5cblxudmFyIHVwZGF0ZVRvZ2dsZSA9IGZ1bmN0aW9uKHRhcmdldCkge1xuXG5cbiAgLy8gQ2xvc2UgcHJldmlvdXNseSBvcGVuIHNlY3Rpb25cbiAgJCgnLnRvZ2dsZS1zZWN0aW9uJykuYXR0cignc3R5bGUnLCAnaGVpZ2h0OiAwJylcbiAgJCgnLnNlY3Rpb24tdG9nZ2xlJykucmVtb3ZlQ2xhc3MoJ29wZW4nKVxuXG5cbiAgLypcbiAgT3BlbiBjbGlja2VkIHNlY3Rpb25cbiAgKi9cblxuICAvLyBBZGQgb3BlbiBjbGFzcyB0byBoZWFkaW5nICh3aGljaCBlZmZlY3RpdmVseSBjaGFuZ2VzIFxuICAvLyB0aGUgcGx1cyB0byBhIG1pbnVzLCB2aWEgdGhlIGNzcylcblxuICB0YXJnZXQuYWRkQ2xhc3MoJ29wZW4nKVxuXG5cbiAgLy8gR3JhYiB0aGUgY2xpY2tlZCBoZWFkaW5nJ3MgaWRcblxuICBjdXJyZW50SUQgPSB0YXJnZXQuYXR0cignaWQnKVxuICBcblxuICAvLyBjYWNoZSB0aGUgc2VjdGlvbiB0byBzaG93LFxuICAvLyBzZWxlY3RpbmcgdmlhIHRoZSBkYXRhLXRvZ2dsZS10YXJnZXQsIHdoaWNoIGlzIHNldCB0byBcbiAgLy8gaXQncyByZXNwZWN0aXZlIGhlYWRpbmcncyBpZFxuXG4gIHNlY3Rpb25Ub1Nob3cgPSAkKCdbZGF0YS10b2dnbGUtdGFyZ2V0PVwiJytjdXJyZW50SUQrJ1wiXScpXG5cblxuICAvLyBncmFiIHRoZSB0YXJnZXQgc2VjdGlvbidzIGhlaWdodFxuXG4gIHNlY3Rpb25IZWlnaHQgPSBzZWN0aW9uVG9TaG93LmRhdGEoJ2hlaWdodCcpICsgJ3B4JztcblxuXG4gIC8vIHNob3cgaXRcblxuICBzZWN0aW9uVG9TaG93LmF0dHIoJ3N0eWxlJywgJ2hlaWdodDogJytzZWN0aW9uSGVpZ2h0KVxuXG5cbn0iLCIvLyB0b2RvOiByZWZhY3RvciB0aGVzZSBpbnRvIGhlbHBlciBtb2R1bGUocylcblxuXG5cbi8qXG5Ub2dnbGVhYmxlIFNlY3Rpb25zXG4qL1xuXG52YXIgdG9nZ2xlU2VjdGlvbnMgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdG9nZ2xlLXNlY3Rpb24nKVxuICB0b2dnbGVTZWN0aW9ucygpXG5cblxuXG5cbnZhciBoZXhEaWdpdHMgPSBuZXcgQXJyYXkoJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknLCAnYScsICdiJywgJ2MnLCAnZCcsICdlJywgJ2YnKTtcblxudmFyIHJnYjJoZXggPSBmdW5jdGlvbihyZ2IpIHtcbiAgcmdiID0gcmdiLm1hdGNoKC9ecmdiXFwoKFxcZCspLFxccyooXFxkKyksXFxzKihcXGQrKVxcKSQvKTtcbiAgcmV0dXJuICcjJyArIGhleF92YWx1ZShyZ2JbMV0pICsgaGV4X3ZhbHVlKHJnYlsyXSkgKyBoZXhfdmFsdWUocmdiWzNdKTtcbn07XG5cbnZhciBoZXhfdmFsdWUgPSBmdW5jdGlvbih4KSB7XG4gIGlmIChpc05hTih4KSkge1xuICAgIHJldHVybiAnMDAnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBoZXhEaWdpdHNbKHggLSAoeCAlIDE2KSkgLyAxNl0gKyBoZXhEaWdpdHNbeCAlIDE2XTtcbiAgfVxufTtcblxudmFyIGRldGVjdENvbG9ycyA9IGZ1bmN0aW9uKGltYWdlKSB7XG4gIHZhciBjb2xvclRoaWVmLCBkZXRlY3RlZF9jb2xvcnMsIGhleCwgaSwgcmVzdWx0cztcbiAgY29sb3JUaGllZiA9IG5ldyBDb2xvclRoaWVmO1xuICBkZXRlY3RlZF9jb2xvcnMgPSBBcnJheSgpO1xuICBkZXRlY3RlZF9jb2xvcnMgPSBjb2xvclRoaWVmLmdldFBhbGV0dGUoaW1hZ2UsIDUpO1xuICAkKCcucGFsZXR0ZUNvbG9ycycpLmVtcHR5KCk7XG4gIGkgPSBkZXRlY3RlZF9jb2xvcnMubGVuZ3RoIC0gMTtcbiAgcmVzdWx0cyA9IFtdO1xuICB3aGlsZSAoaSA+PSAwKSB7XG4gICAgaGV4ID0gcmdiMmhleCgncmdiKCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMF0gKyAnLCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMV0gKyAnLCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMl0gKyAnKScpO1xuICAgICQoJy5wYWxldHRlQ29sb3JzJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY29sb3JcIiBkYXRhLWhleD1cIicgKyBoZXggKyAnXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoJyArIGRldGVjdGVkX2NvbG9yc1tpXVswXSArICcsJyArIGRldGVjdGVkX2NvbG9yc1tpXVsxXSArICcsJyArIGRldGVjdGVkX2NvbG9yc1tpXVsyXSArICcpO1wiPjwvZGl2PicpO1xuICAgIHJlc3VsdHMucHVzaChpLS0pO1xuICB9XG4gIHJldHVybiByZXN1bHRzO1xufTtcblxuXG5cblxuXG4vKlxuQ29sb3IgUGlja2VyXG5UT0RPOiByZWZhY3RvciB0aGlzIGludG8gYSBtb2R1bGVcbiovXG5cbihmdW5jdGlvbigkKSB7XG5cbiAgLy8gQ09MT1IgUElDS0VSXG4gIHZhciBjb2xvcl9waWNrZXJfb3B0aW9ucyA9IHtcbiAgICBjb250cm9sOiAnd2hlZWwnLFxuICAgIHBvc2l0aW9uOiAncmlnaHQnXG4gIH07XG5cblxuICAvLyBJbml0IGNvbG9ycGlja2Vyc1xuICAkKCcjY29sb3JQaWNrZXIxJykubWluaWNvbG9ycyhjb2xvcl9waWNrZXJfb3B0aW9ucyk7XG4gICQoJyNjb2xvclBpY2tlcjInKS5taW5pY29sb3JzKGNvbG9yX3BpY2tlcl9vcHRpb25zKTtcblxuICAvLyBTZXQgdGhlIGxhc3QgYWN0aXZlIGNvbG9yIHBpY2tlciB3aGVuIGNsaWNrZWRcbiAgd2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlciA9IGZhbHNlO1xuICAkKCcjY29sb3JQaWNrZXIxLCAjY29sb3JQaWNrZXIyJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIgPSAkKHRoaXMpO1xuICB9KTtcbiAgXG4gIC8vIFdoZW4gY2xpY2tpbmcgYSBkZXRlY3RlZCBjb2xvciwgYXBwbHkgaXQgdG8gdGhlIGxhc3Qgc2VsZWN0ZWQgY29sb3JwaWNrZXJcbiAgJCgnLnBhbGV0dGVDb2xvcnMnKS5vbignY2xpY2snLCAnLmNvbG9yJywgZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2cod2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlcik7XG4gICAgaWYgKHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIpIHtcbiAgICAgIHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIudmFsKCQodGhpcykuZGF0YSgnaGV4JykpO1xuICAgICAgcmV0dXJuIHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIubWluaWNvbG9ycygndmFsdWUnLCAkKHRoaXMpLmRhdGEoJ2hleCcpKTtcbiAgICB9XG4gIH0pO1xuICAvLyBDT0xPUiBQSUNLRVJcblxuXG4gIC8vIERldGVjdCB0aGUgY29sb3JzIGZyb20gdGhlIHNhdmVkIGltYWdlIHVzaW5nIGNvbG9ydGhpZWZcbiAgJCgnI3JlZnJlc2hEZXRlY3RlZENvbG9ycycpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgaW1nO1xuICAgIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5zcmMgPSB3aW5kb3cuY3JvcHBlci5nZXREYXRhVVJMKCk7XG4gICAgZGV0ZWN0Q29sb3JzKGltZyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuXG5cbiAgLy8gVXBkYXRlIHRoZSBidXNpbmVzcyBwcmV2aWV3XG4gIHJldHVybiB1cGRhdGVQcmV2aWV3ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRleHQ7XG4gICAgJCgnLnByZXZpZXdIZWFkZXInKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAkKCcjY29sb3JQaWNrZXIxJykudmFsKCkpO1xuICAgICQoJy5jb250ZW50LCAuc29jaWFsRm9vdGVyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJCgnI2NvbG9yUGlja2VyMicpLnZhbCgpKTtcbiAgICAkKCcucHJldmlld0hlYWRlciBpbWcnKS5hdHRyKCdzcmMnLCAkKCcudGhlSW1hZ2UnKS52YWwoKSk7XG4gICAgJCgnLmNvbnRlbnQgaDEnKS5odG1sKCQoJy5idXNpbmVzc05hbWUnKS52YWwoKSk7XG4gICAgdGV4dCA9ICQoJy5hZGRyZXNzJykudmFsKCkgKyAnICcgKyAkKCcuYWRkcmVzczInKS52YWwoKSArICcgJyArICQoJy5jaXR5JykudmFsKCkgKyAnICcgKyAkKCcuc3RhdGUnKS52YWwoKSArICcgJyArICQoJy56aXBDb2RlJykudmFsKCk7XG4gICAgcmV0dXJuICQoJy5jb250ZW50IHAnKS5odG1sKHRleHQpO1xuICB9O1xuXG59KShqUXVlcnkpOyJdfQ==
