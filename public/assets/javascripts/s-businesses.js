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





var toggle = function() {

  toggleSections.each(function(i) {
      var section = $(this)


      // Grab height
      // height = section.height()
      // Store it for later use
      // when done... hide sections
      section.attr('data-height', section.height()).promise().done( function() {
        // Collapse all sections
        section.attr('style', 'height:0')
      })


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy90b2dnbGUtc2VjdGlvbi5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9zLWJ1c2luZXNzZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG5cblRvZ2dsZSBTZWN0aW9uc1xuXG5BZGRvcmRpYW4tbGlrZSBmdW5jdGlvbmFsaXR5IGZvciBwYWdlIHNlY3Rpb25zXG5cbk5vdGVzOlxuLSB0cmFuc2l0aW9uIG9uIGhlaWdodCBpcyBoYW5kbGVkIHZpYSBjc3NcblxuKi9cblxuXG5cblxuXG52YXIgdG9nZ2xlU2VjdGlvbnMgPSAkKCcudG9nZ2xlLXNlY3Rpb24nKVxudmFyIGhlaWdodFxudmFyIHNlY3Rpb25IZWlnaHRcbnZhciBzZWN0aW9uVG9TaG93XG52YXIgY3VycmVudElEXG52YXIgbmV4dEJ0bnMgPSAkKCcudG9nZ2xlLXNlY3Rpb25fYnRuLW5leHQnKVxudmFyIHByZXZCdG5zID0gJCgnLnRvZ2dsZS1zZWN0aW9uX2J0bi1wcmV2JylcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgLy8gRmlyc3QsIHJlbW92ZSBmaXJzdCBhbmQgbGFzdCBidG5zXG5cbiAgcmVtb3ZlRmlyc3RBbmRMYXN0QnRucygpIFxuXG5cbiAgLy8gT25jZSBpbWFnZXMgaGF2ZSBsb2FkZWQsIHNldCB0aGUgdG9nZ2xlXG4gIC8vIHNlY3Rpb25zXG5cbiAgJCh3aW5kb3cpLm9uKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcblxuICAgIHRvZ2dsZSgpXG5cbiAgfSlcblxuXG4gIC8vIFNldCBldmVudCBsaXN0ZW5lcnMgb24gdGhlIG5leHQvcHJldiBidG5zXG5cbiAgc2V0QnV0dG9ucygpXG5cbn0gLy8gZW5kIGV4cG9ydHNcblxuXG5cblxuXG52YXIgdG9nZ2xlID0gZnVuY3Rpb24oKSB7XG5cbiAgdG9nZ2xlU2VjdGlvbnMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICB2YXIgc2VjdGlvbiA9ICQodGhpcylcblxuXG4gICAgICAvLyBHcmFiIGhlaWdodFxuICAgICAgLy8gaGVpZ2h0ID0gc2VjdGlvbi5oZWlnaHQoKVxuICAgICAgLy8gU3RvcmUgaXQgZm9yIGxhdGVyIHVzZVxuICAgICAgLy8gd2hlbiBkb25lLi4uIGhpZGUgc2VjdGlvbnNcbiAgICAgIHNlY3Rpb24uYXR0cignZGF0YS1oZWlnaHQnLCBzZWN0aW9uLmhlaWdodCgpKS5wcm9taXNlKCkuZG9uZSggZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIENvbGxhcHNlIGFsbCBzZWN0aW9uc1xuICAgICAgICBzZWN0aW9uLmF0dHIoJ3N0eWxlJywgJ2hlaWdodDowJylcbiAgICAgIH0pXG5cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgc2VjdGlvbjpcbiAgICAgIC8vIC0gYWRkIGlkIHdpdGggdGhlIHNlY3Rpb24ncyBpbmRleFxuICAgICAgc2VjdGlvbi5hdHRyKCdkYXRhLXRvZ2dsZS10YXJnZXQnLCAndG9nZ2xlLScraSlcblxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSBoZWFkaW5nOlxuICAgICAgLy8gYWRkIGNsYXNzIChmb3IgcHJvcGVyIHN0eWxpbmcpXG4gICAgICAvLyAobm90ZTogdGhpcyBjb3VsZCBiZSBkb25lIGluIGFkdmFuY2UgaW4gdGhlIGRvbSwgXG4gICAgICAvLyBidXQgSSdtIHVuc3VyZSBpZiB0aGlzIGlzIHdvcnRoIHRoZSBlZmZvcnQuLi5cbiAgICAgIC8vIGFzIHRoZSBjdXJyZW50IHJhaWxzIGhlbHBlciBkb2Vzbid0IHlldCBhbGxvdyBmb3IgdGhpcylcbiAgICAgIHNlY3Rpb24ucHJldigpLmZpbmQoJ2gyJylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ3RvZ2dsZS0nK2kpXG4gICAgICAgIC5hZGRDbGFzcygnc2VjdGlvbi10b2dnbGUnKVxuXG5cblxuXG5cblxuICAgICAgLy8gQ2xpY2sgTGlzdGVuZXJcbiAgICAgIC8vIFNjb3BlZCB0byB0aGUgZG9jdW1lbnQsIG1ha2luZyB1c2Ugb2YgalF1ZXJ5J3MgY29udmllbmNlLWJlaGF2aW9yIFxuICAgICAgLy8gd2hpY2ggcHJldmVudHMgdGhlIG5lZWQgZm9yIGEgY2xvc3VyZSAob3RoZXJ3aXNlIG5lZWRlZCB3aGVuIFxuICAgICAgLy8gYXR0YWNoaW5nIGV2ZW50IGhhbmRsZXJzIGluc2lkZSBvZiBhIGxvb3AsIGFzIEpTIGV2YWx1YXRlcyBmdW5jdGlvbnNcbiAgICAgIC8vIGF0IHRoZSB0aW1lIG9mIGV4ZWN1dGlvbilcblxuICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgKCcjdG9nZ2xlLScraSksIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG4gICAgICAgIFxuICAgICAgICB1cGRhdGVUb2dnbGUoJHRoaXMpXG5cbiAgICAgIH0pIC8vIGVuZCBjbGljayBoYW5kbGVyICBcblxuICAgIH0pIC8vIGVuZCBsb29wXG5cblxuICAvKlxuICBTZXQgZmlyc3QgdG8gb3BlblxuICAqL1xuXG4gIHZhciBmaXN0U2VjdGlvbiA9ICQoJyN0b2dnbGUtMCcpXG4gIHVwZGF0ZVRvZ2dsZShmaXN0U2VjdGlvbilcblxuICAgICAgXG59XG5cblxuXG5cblxuXG5cblxuXG52YXIgdXBkYXRlVG9nZ2xlID0gZnVuY3Rpb24odGFyZ2V0KSB7XG5cblxuICAvLyBDbG9zZSBwcmV2aW91c2x5IG9wZW4gc2VjdGlvblxuICAkKCcudG9nZ2xlLXNlY3Rpb24nKS5hdHRyKCdzdHlsZScsICdoZWlnaHQ6IDAnKVxuICAkKCcuc2VjdGlvbi10b2dnbGUnKS5yZW1vdmVDbGFzcygnb3BlbicpXG5cblxuICAvKlxuICBPcGVuIGNsaWNrZWQgc2VjdGlvblxuICAqL1xuXG4gIC8vIEFkZCBvcGVuIGNsYXNzIHRvIGhlYWRpbmcgKHdoaWNoIGVmZmVjdGl2ZWx5IGNoYW5nZXMgXG4gIC8vIHRoZSBwbHVzIHRvIGEgbWludXMsIHZpYSB0aGUgY3NzKVxuXG4gIHRhcmdldC5hZGRDbGFzcygnb3BlbicpXG5cblxuICAvLyBHcmFiIHRoZSBjbGlja2VkIGhlYWRpbmcncyBpZFxuXG4gIGN1cnJlbnRJRCA9IHRhcmdldC5hdHRyKCdpZCcpXG4gIFxuXG4gIC8vIGNhY2hlIHRoZSBzZWN0aW9uIHRvIHNob3csXG4gIC8vIHNlbGVjdGluZyB2aWEgdGhlIGRhdGEtdG9nZ2xlLXRhcmdldCwgd2hpY2ggaXMgc2V0IHRvIFxuICAvLyBpdCdzIHJlc3BlY3RpdmUgaGVhZGluZydzIGlkXG5cbiAgc2VjdGlvblRvU2hvdyA9ICQoJ1tkYXRhLXRvZ2dsZS10YXJnZXQ9XCInK2N1cnJlbnRJRCsnXCJdJylcblxuXG4gIC8vIGdyYWIgdGhlIHRhcmdldCBzZWN0aW9uJ3MgaGVpZ2h0XG5cbiAgc2VjdGlvbkhlaWdodCA9IHNlY3Rpb25Ub1Nob3cuZGF0YSgnaGVpZ2h0JykgKyAncHgnO1xuXG5cbiAgLy8gc2hvdyBpdFxuXG4gIHNlY3Rpb25Ub1Nob3cuYXR0cignc3R5bGUnLCAnaGVpZ2h0OiAnK3NlY3Rpb25IZWlnaHQpXG5cblxufVxuXG5cblxuXG5cbnZhciBzZXRCdXR0b25zID0gZnVuY3Rpb24oKSB7XG5cbiAgbmV4dEJ0bnMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgJCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBuZXh0SW5kZXggPSBpICsgMVxuXG4gICAgICB2YXIgbmV4dFRhcmdldCA9ICQoJyN0b2dnbGUtJytuZXh0SW5kZXgpXG4gICAgICB1cGRhdGVUb2dnbGUobmV4dFRhcmdldClcblxuICAgIH0pXG4gIH0pXG5cbiAgcHJldkJ0bnMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgJCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBwcmV2SW5kZXggPSBpIC0gMVxuXG4gICAgICB2YXIgcHJldlRhcmdldCA9ICQoJyN0b2dnbGUtJytwcmV2SW5kZXgpXG4gICAgICB1cGRhdGVUb2dnbGUocHJldlRhcmdldClcblxuICAgIH0pXG4gIH0pXG5cbn1cblxuXG5cbnZhciByZW1vdmVGaXJzdEFuZExhc3RCdG5zID0gZnVuY3Rpb24oKSB7XG4gIHByZXZCdG5zLmZpcnN0KCkuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gIG5leHRCdG5zLmxhc3QoKS5hZGRDbGFzcygnaGlkZGVuJylcbn0iLCIvLyB0b2RvOiByZWZhY3RvciB0aGVzZSBpbnRvIGhlbHBlciBtb2R1bGUocylcblxuXG5cbi8qXG5Ub2dnbGVhYmxlIFNlY3Rpb25zXG4qL1xuXG52YXIgdG9nZ2xlU2VjdGlvbnMgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdG9nZ2xlLXNlY3Rpb24nKVxudG9nZ2xlU2VjdGlvbnMoKVxuXG5cblxuXG52YXIgaGV4RGlnaXRzID0gbmV3IEFycmF5KCcwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJyk7XG5cbnZhciByZ2IyaGV4ID0gZnVuY3Rpb24ocmdiKSB7XG4gIHJnYiA9IHJnYi5tYXRjaCgvXnJnYlxcKChcXGQrKSxcXHMqKFxcZCspLFxccyooXFxkKylcXCkkLyk7XG4gIHJldHVybiAnIycgKyBoZXhfdmFsdWUocmdiWzFdKSArIGhleF92YWx1ZShyZ2JbMl0pICsgaGV4X3ZhbHVlKHJnYlszXSk7XG59O1xuXG52YXIgaGV4X3ZhbHVlID0gZnVuY3Rpb24oeCkge1xuICBpZiAoaXNOYU4oeCkpIHtcbiAgICByZXR1cm4gJzAwJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaGV4RGlnaXRzWyh4IC0gKHggJSAxNikpIC8gMTZdICsgaGV4RGlnaXRzW3ggJSAxNl07XG4gIH1cbn07XG5cbnZhciBkZXRlY3RDb2xvcnMgPSBmdW5jdGlvbihpbWFnZSkge1xuICB2YXIgY29sb3JUaGllZiwgZGV0ZWN0ZWRfY29sb3JzLCBoZXgsIGksIHJlc3VsdHM7XG4gIGNvbG9yVGhpZWYgPSBuZXcgQ29sb3JUaGllZjtcbiAgZGV0ZWN0ZWRfY29sb3JzID0gQXJyYXkoKTtcbiAgZGV0ZWN0ZWRfY29sb3JzID0gY29sb3JUaGllZi5nZXRQYWxldHRlKGltYWdlLCA1KTtcbiAgJCgnLnBhbGV0dGVDb2xvcnMnKS5lbXB0eSgpO1xuICBpID0gZGV0ZWN0ZWRfY29sb3JzLmxlbmd0aCAtIDE7XG4gIHJlc3VsdHMgPSBbXTtcbiAgd2hpbGUgKGkgPj0gMCkge1xuICAgIGhleCA9IHJnYjJoZXgoJ3JnYignICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzBdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzFdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzJdICsgJyknKTtcbiAgICAkKCcucGFsZXR0ZUNvbG9ycycpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImNvbG9yXCIgZGF0YS1oZXg9XCInICsgaGV4ICsgJ1wiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogcmdiKCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMF0gKyAnLCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMV0gKyAnLCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMl0gKyAnKTtcIj48L2Rpdj4nKTtcbiAgICByZXN1bHRzLnB1c2goaS0tKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cblxuXG5cblxuLypcbkNvbG9yIFBpY2tlclxuVE9ETzogcmVmYWN0b3IgdGhpcyBpbnRvIGEgbW9kdWxlXG4qL1xuXG4oZnVuY3Rpb24oJCkge1xuXG4gIC8vIENPTE9SIFBJQ0tFUlxuICB2YXIgY29sb3JfcGlja2VyX29wdGlvbnMgPSB7XG4gICAgY29udHJvbDogJ3doZWVsJyxcbiAgICBwb3NpdGlvbjogJ3JpZ2h0J1xuICB9O1xuXG5cbiAgLy8gSW5pdCBjb2xvcnBpY2tlcnNcbiAgJCgnI2NvbG9yUGlja2VyMScpLm1pbmljb2xvcnMoY29sb3JfcGlja2VyX29wdGlvbnMpO1xuICAkKCcjY29sb3JQaWNrZXIyJykubWluaWNvbG9ycyhjb2xvcl9waWNrZXJfb3B0aW9ucyk7XG5cbiAgLy8gU2V0IHRoZSBsYXN0IGFjdGl2ZSBjb2xvciBwaWNrZXIgd2hlbiBjbGlja2VkXG4gIHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIgPSBmYWxzZTtcbiAgJCgnI2NvbG9yUGlja2VyMSwgI2NvbG9yUGlja2VyMicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyID0gJCh0aGlzKTtcbiAgfSk7XG4gIFxuICAvLyBXaGVuIGNsaWNraW5nIGEgZGV0ZWN0ZWQgY29sb3IsIGFwcGx5IGl0IHRvIHRoZSBsYXN0IHNlbGVjdGVkIGNvbG9ycGlja2VyXG4gICQoJy5wYWxldHRlQ29sb3JzJykub24oJ2NsaWNrJywgJy5jb2xvcicsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIpO1xuICAgIGlmICh3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyKSB7XG4gICAgICB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyLnZhbCgkKHRoaXMpLmRhdGEoJ2hleCcpKTtcbiAgICAgIHJldHVybiB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyLm1pbmljb2xvcnMoJ3ZhbHVlJywgJCh0aGlzKS5kYXRhKCdoZXgnKSk7XG4gICAgfVxuICB9KTtcbiAgLy8gQ09MT1IgUElDS0VSXG5cblxuICAvLyBEZXRlY3QgdGhlIGNvbG9ycyBmcm9tIHRoZSBzYXZlZCBpbWFnZSB1c2luZyBjb2xvcnRoaWVmXG4gICQoJyNyZWZyZXNoRGV0ZWN0ZWRDb2xvcnMnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgdmFyIGltZztcbiAgICBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gd2luZG93LmNyb3BwZXIuZ2V0RGF0YVVSTCgpO1xuICAgIGRldGVjdENvbG9ycyhpbWcpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuXG4gIC8vIFVwZGF0ZSB0aGUgYnVzaW5lc3MgcHJldmlld1xuICByZXR1cm4gdXBkYXRlUHJldmlldyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0ZXh0O1xuICAgICQoJy5wcmV2aWV3SGVhZGVyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJCgnI2NvbG9yUGlja2VyMScpLnZhbCgpKTtcbiAgICAkKCcuY29udGVudCwgLnNvY2lhbEZvb3RlcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICQoJyNjb2xvclBpY2tlcjInKS52YWwoKSk7XG4gICAgJCgnLnByZXZpZXdIZWFkZXIgaW1nJykuYXR0cignc3JjJywgJCgnLnRoZUltYWdlJykudmFsKCkpO1xuICAgICQoJy5jb250ZW50IGgxJykuaHRtbCgkKCcuYnVzaW5lc3NOYW1lJykudmFsKCkpO1xuICAgIHRleHQgPSAkKCcuYWRkcmVzcycpLnZhbCgpICsgJyAnICsgJCgnLmFkZHJlc3MyJykudmFsKCkgKyAnICcgKyAkKCcuY2l0eScpLnZhbCgpICsgJyAnICsgJCgnLnN0YXRlJykudmFsKCkgKyAnICcgKyAkKCcuemlwQ29kZScpLnZhbCgpO1xuICAgIHJldHVybiAkKCcuY29udGVudCBwJykuaHRtbCh0ZXh0KTtcbiAgfTtcblxufSkoalF1ZXJ5KTsiXX0=
