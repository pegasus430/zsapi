(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* -------------------------------------------
logo Changes
*/

var mostRecentLogo = $('#saved_image_1')

var previewImage_asImage = $('#preview-image-as-image')
var previewImage_asBg = $('#preview-image-as-bg')


var mostRecentLogoSrc
var handleLogo = function() {
  
  // Get src
  mostRecentLogoSrc = mostRecentLogo[0].currentSrc

  // Update: 

  // - core logo
  previewImage_asImage.attr('src', mostRecentLogoSrc)
  // - background image
  previewImage_asBg.css('background-image', mostRecentLogoSrc)
}




/* -------------------------------------------
Primary and Seconday Color Changs
*/


var mostRecentPrimary
var mostRecentSecondary
var handleColors = function() {

  // Get primary
  var mostRecentPrimary = $('#colorPicker1').next().find('.minicolors-swatch-color').css('background-color')
  // Get secondary
  // secondary color isn't currently used in preview... commenting out for now
  // var mostRecentSecondary = $('#colorPicker2').next().find('.minicolors-swatch-color').css('background-color')


  // Update: 

  $('.previewPrimaryBg').each(function() {
    $(this).css('background-color', mostRecentPrimary)
  })

}







module.exports = function() {

  /* -------------------------------------------
  Listen for preview show
  */


  $("[data-target='#previewModal']").click(function() {

    handleLogo()

    handleColors()

  })


}
},{}],2:[function(require,module,exports){
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



  // Once images have loaded, set the toggle sections

  $(window).on("load", function() {
    
    // First, remove first and last btns

    removeFirstAndLastBtns() 

    toggle()
    

    // Set event listeners on the next/prev btns
    setButtons()

  })



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

      updateToggle($('#toggle-'+(i+1)))

    })
  })

  prevBtns.each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault()

      updateToggle($('#toggle-'+(i-1)))

    })
  })

}



var removeFirstAndLastBtns = function() {
  prevBtns.first().addClass('hidden')
  nextBtns.last().addClass('hidden')
}
},{}],3:[function(require,module,exports){
// todo: refactor these into helper module(s)


/*
Watch for changes on business 
logo and styles and update the
mobile preview accordingly
*/

var mobilePreviewWatch = require('./components/mobile-preview-watchers')
mobilePreviewWatch()


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
    img.src = cropper.getDataURL();
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
},{"./components/mobile-preview-watchers":1,"./components/toggle-section":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy9tb2JpbGUtcHJldmlldy13YXRjaGVycy5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9jb21wb25lbnRzL3RvZ2dsZS1zZWN0aW9uLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL3MtYnVzaW5lc3Nlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDak1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sb2dvIENoYW5nZXNcbiovXG5cbnZhciBtb3N0UmVjZW50TG9nbyA9ICQoJyNzYXZlZF9pbWFnZV8xJylcblxudmFyIHByZXZpZXdJbWFnZV9hc0ltYWdlID0gJCgnI3ByZXZpZXctaW1hZ2UtYXMtaW1hZ2UnKVxudmFyIHByZXZpZXdJbWFnZV9hc0JnID0gJCgnI3ByZXZpZXctaW1hZ2UtYXMtYmcnKVxuXG5cbnZhciBtb3N0UmVjZW50TG9nb1NyY1xudmFyIGhhbmRsZUxvZ28gPSBmdW5jdGlvbigpIHtcbiAgXG4gIC8vIEdldCBzcmNcbiAgbW9zdFJlY2VudExvZ29TcmMgPSBtb3N0UmVjZW50TG9nb1swXS5jdXJyZW50U3JjXG5cbiAgLy8gVXBkYXRlOiBcblxuICAvLyAtIGNvcmUgbG9nb1xuICBwcmV2aWV3SW1hZ2VfYXNJbWFnZS5hdHRyKCdzcmMnLCBtb3N0UmVjZW50TG9nb1NyYylcbiAgLy8gLSBiYWNrZ3JvdW5kIGltYWdlXG4gIHByZXZpZXdJbWFnZV9hc0JnLmNzcygnYmFja2dyb3VuZC1pbWFnZScsIG1vc3RSZWNlbnRMb2dvU3JjKVxufVxuXG5cblxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QcmltYXJ5IGFuZCBTZWNvbmRheSBDb2xvciBDaGFuZ3NcbiovXG5cblxudmFyIG1vc3RSZWNlbnRQcmltYXJ5XG52YXIgbW9zdFJlY2VudFNlY29uZGFyeVxudmFyIGhhbmRsZUNvbG9ycyA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIEdldCBwcmltYXJ5XG4gIHZhciBtb3N0UmVjZW50UHJpbWFyeSA9ICQoJyNjb2xvclBpY2tlcjEnKS5uZXh0KCkuZmluZCgnLm1pbmljb2xvcnMtc3dhdGNoLWNvbG9yJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJylcbiAgLy8gR2V0IHNlY29uZGFyeVxuICAvLyBzZWNvbmRhcnkgY29sb3IgaXNuJ3QgY3VycmVudGx5IHVzZWQgaW4gcHJldmlldy4uLiBjb21tZW50aW5nIG91dCBmb3Igbm93XG4gIC8vIHZhciBtb3N0UmVjZW50U2Vjb25kYXJ5ID0gJCgnI2NvbG9yUGlja2VyMicpLm5leHQoKS5maW5kKCcubWluaWNvbG9ycy1zd2F0Y2gtY29sb3InKS5jc3MoJ2JhY2tncm91bmQtY29sb3InKVxuXG5cbiAgLy8gVXBkYXRlOiBcblxuICAkKCcucHJldmlld1ByaW1hcnlCZycpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBtb3N0UmVjZW50UHJpbWFyeSlcbiAgfSlcblxufVxuXG5cblxuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgTGlzdGVuIGZvciBwcmV2aWV3IHNob3dcbiAgKi9cblxuXG4gICQoXCJbZGF0YS10YXJnZXQ9JyNwcmV2aWV3TW9kYWwnXVwiKS5jbGljayhmdW5jdGlvbigpIHtcblxuICAgIGhhbmRsZUxvZ28oKVxuXG4gICAgaGFuZGxlQ29sb3JzKClcblxuICB9KVxuXG5cbn0iLCIvKlxuXG5Ub2dnbGUgU2VjdGlvbnNcblxuQWRkb3JkaWFuLWxpa2UgZnVuY3Rpb25hbGl0eSBmb3IgcGFnZSBzZWN0aW9uc1xuXG5Ob3Rlczpcbi0gdHJhbnNpdGlvbiBvbiBoZWlnaHQgaXMgaGFuZGxlZCB2aWEgY3NzXG5cbiovXG5cblxuXG5cblxudmFyIHRvZ2dsZVNlY3Rpb25zID0gJCgnLnRvZ2dsZS1zZWN0aW9uJylcbnZhciBoZWlnaHRcbnZhciBzZWN0aW9uSGVpZ2h0XG52YXIgc2VjdGlvblRvU2hvd1xudmFyIGN1cnJlbnRJRFxudmFyIG5leHRCdG5zID0gJCgnLnRvZ2dsZS1zZWN0aW9uX2J0bi1uZXh0JylcbnZhciBwcmV2QnRucyA9ICQoJy50b2dnbGUtc2VjdGlvbl9idG4tcHJldicpXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuXG5cbiAgLy8gT25jZSBpbWFnZXMgaGF2ZSBsb2FkZWQsIHNldCB0aGUgdG9nZ2xlIHNlY3Rpb25zXG5cbiAgJCh3aW5kb3cpLm9uKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcbiAgICBcbiAgICAvLyBGaXJzdCwgcmVtb3ZlIGZpcnN0IGFuZCBsYXN0IGJ0bnNcblxuICAgIHJlbW92ZUZpcnN0QW5kTGFzdEJ0bnMoKSBcblxuICAgIHRvZ2dsZSgpXG4gICAgXG5cbiAgICAvLyBTZXQgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZSBuZXh0L3ByZXYgYnRuc1xuICAgIHNldEJ1dHRvbnMoKVxuXG4gIH0pXG5cblxuXG59IC8vIGVuZCBleHBvcnRzXG5cblxuXG5cbnZhciB0b2dnbGUgPSBmdW5jdGlvbigpIHtcblxuXG4gIHRvZ2dsZVNlY3Rpb25zLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgdmFyIHNlY3Rpb24gPSAkKHRoaXMpXG5cblxuICAgICAgLy8gSGVpZ2h0IGlzIHNldCB0byAwIGluIGNzc1xuICAgICAgLy8gYnkgdXNpbmcgdGhlIGluY3JlZGlibHkgbmlmZnR5IHNjcm9sbEhlaWdodCwgXG4gICAgICAvLyB3ZSBjYW4gZ2V0IHRoZSBoZWlnaHQgYW55d2F5cyBcbiAgICAgIC8vIHNlZTogXG4gICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzUwMDMyMjAvamF2YXNjcmlwdC1qcXVlcnktYW5pbWF0ZS10by1hdXRvLWhlaWdodCNhbnN3ZXItMjQ3NjI4NDhcbiAgICAgIGhlaWdodCA9IHNlY3Rpb24uZ2V0KDApLnNjcm9sbEhlaWdodFxuXG5cbiAgICAgIC8vIFN0b3JlIGhlaWdodFxuICAgICAgc2VjdGlvbi5hdHRyKCdkYXRhLWhlaWdodCcsIGhlaWdodClcblxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSBzZWN0aW9uOlxuICAgICAgLy8gLSBhZGQgaWQgd2l0aCB0aGUgc2VjdGlvbidzIGluZGV4XG4gICAgICBzZWN0aW9uLmF0dHIoJ2RhdGEtdG9nZ2xlLXRhcmdldCcsICd0b2dnbGUtJytpKVxuXG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIGhlYWRpbmc6XG4gICAgICAvLyBhZGQgY2xhc3MgKGZvciBwcm9wZXIgc3R5bGluZylcbiAgICAgIC8vIChub3RlOiB0aGlzIGNvdWxkIGJlIGRvbmUgaW4gYWR2YW5jZSBpbiB0aGUgZG9tLCBcbiAgICAgIC8vIGJ1dCBJJ20gdW5zdXJlIGlmIHRoaXMgaXMgd29ydGggdGhlIGVmZm9ydC4uLlxuICAgICAgLy8gYXMgdGhlIGN1cnJlbnQgcmFpbHMgaGVscGVyIGRvZXNuJ3QgeWV0IGFsbG93IGZvciB0aGlzKVxuICAgICAgc2VjdGlvbi5wcmV2KCkuZmluZCgnaDInKVxuICAgICAgICAuYXR0cignaWQnLCAndG9nZ2xlLScraSlcbiAgICAgICAgLmFkZENsYXNzKCdzZWN0aW9uLXRvZ2dsZScpXG5cblxuXG4gICAgICAvLyBDbGljayBMaXN0ZW5lclxuICAgICAgLy8gU2NvcGVkIHRvIHRoZSBkb2N1bWVudCwgbWFraW5nIHVzZSBvZiBqUXVlcnkncyBjb252aWVuY2UtYmVoYXZpb3IgXG4gICAgICAvLyB3aGljaCBwcmV2ZW50cyB0aGUgbmVlZCBmb3IgYSBjbG9zdXJlIChvdGhlcndpc2UgbmVlZGVkIHdoZW4gXG4gICAgICAvLyBhdHRhY2hpbmcgZXZlbnQgaGFuZGxlcnMgaW5zaWRlIG9mIGEgbG9vcCwgYXMgSlMgZXZhbHVhdGVzIGZ1bmN0aW9uc1xuICAgICAgLy8gYXQgdGhlIHRpbWUgb2YgZXhlY3V0aW9uKVxuXG4gICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAoJyN0b2dnbGUtJytpKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcylcbiAgICAgICAgXG4gICAgICAgIHVwZGF0ZVRvZ2dsZSgkdGhpcylcblxuICAgICAgfSkgLy8gZW5kIGNsaWNrIGhhbmRsZXIgIFxuXG4gICAgfSkgLy8gZW5kIGxvb3BcblxuXG4gIC8qXG4gIFNldCBmaXJzdCB0byBvcGVuXG4gICovXG5cbiAgdmFyIGZpc3RTZWN0aW9uID0gJCgnI3RvZ2dsZS0wJylcbiAgdXBkYXRlVG9nZ2xlKGZpc3RTZWN0aW9uKVxuXG4gICAgICBcbn1cblxuXG5cblxuXG5cblxuXG5cbnZhciB1cGRhdGVUb2dnbGUgPSBmdW5jdGlvbih0YXJnZXQpIHtcblxuXG4gIC8vIENsb3NlIHByZXZpb3VzbHkgb3BlbiBzZWN0aW9uXG4gICQoJy50b2dnbGUtc2VjdGlvbicpLmF0dHIoJ3N0eWxlJywgJ2hlaWdodDogMCcpXG4gICQoJy5zZWN0aW9uLXRvZ2dsZScpLnJlbW92ZUNsYXNzKCdvcGVuJylcblxuXG4gIC8qXG4gIE9wZW4gY2xpY2tlZCBzZWN0aW9uXG4gICovXG5cbiAgLy8gQWRkIG9wZW4gY2xhc3MgdG8gaGVhZGluZyAod2hpY2ggZWZmZWN0aXZlbHkgY2hhbmdlcyBcbiAgLy8gdGhlIHBsdXMgdG8gYSBtaW51cywgdmlhIHRoZSBjc3MpXG5cbiAgdGFyZ2V0LmFkZENsYXNzKCdvcGVuJylcblxuXG4gIC8vIEdyYWIgdGhlIGNsaWNrZWQgaGVhZGluZydzIGlkXG5cbiAgY3VycmVudElEID0gdGFyZ2V0LmF0dHIoJ2lkJylcbiAgXG5cbiAgLy8gY2FjaGUgdGhlIHNlY3Rpb24gdG8gc2hvdyxcbiAgLy8gc2VsZWN0aW5nIHZpYSB0aGUgZGF0YS10b2dnbGUtdGFyZ2V0LCB3aGljaCBpcyBzZXQgdG8gXG4gIC8vIGl0J3MgcmVzcGVjdGl2ZSBoZWFkaW5nJ3MgaWRcblxuICBzZWN0aW9uVG9TaG93ID0gJCgnW2RhdGEtdG9nZ2xlLXRhcmdldD1cIicrY3VycmVudElEKydcIl0nKVxuXG5cbiAgLy8gZ3JhYiB0aGUgdGFyZ2V0IHNlY3Rpb24ncyBoZWlnaHRcblxuICBzZWN0aW9uSGVpZ2h0ID0gc2VjdGlvblRvU2hvdy5kYXRhKCdoZWlnaHQnKSArICdweCc7XG5cblxuICAvLyBzaG93IGl0XG5cbiAgc2VjdGlvblRvU2hvdy5hdHRyKCdzdHlsZScsICdoZWlnaHQ6ICcrc2VjdGlvbkhlaWdodClcblxuXG59XG5cblxuXG5cblxudmFyIHNldEJ1dHRvbnMgPSBmdW5jdGlvbigpIHtcblxuICBuZXh0QnRucy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICB1cGRhdGVUb2dnbGUoJCgnI3RvZ2dsZS0nKyhpKzEpKSlcblxuICAgIH0pXG4gIH0pXG5cbiAgcHJldkJ0bnMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgJCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgdXBkYXRlVG9nZ2xlKCQoJyN0b2dnbGUtJysoaS0xKSkpXG5cbiAgICB9KVxuICB9KVxuXG59XG5cblxuXG52YXIgcmVtb3ZlRmlyc3RBbmRMYXN0QnRucyA9IGZ1bmN0aW9uKCkge1xuICBwcmV2QnRucy5maXJzdCgpLmFkZENsYXNzKCdoaWRkZW4nKVxuICBuZXh0QnRucy5sYXN0KCkuYWRkQ2xhc3MoJ2hpZGRlbicpXG59IiwiLy8gdG9kbzogcmVmYWN0b3IgdGhlc2UgaW50byBoZWxwZXIgbW9kdWxlKHMpXG5cblxuLypcbldhdGNoIGZvciBjaGFuZ2VzIG9uIGJ1c2luZXNzIFxubG9nbyBhbmQgc3R5bGVzIGFuZCB1cGRhdGUgdGhlXG5tb2JpbGUgcHJldmlldyBhY2NvcmRpbmdseVxuKi9cblxudmFyIG1vYmlsZVByZXZpZXdXYXRjaCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tb2JpbGUtcHJldmlldy13YXRjaGVycycpXG5tb2JpbGVQcmV2aWV3V2F0Y2goKVxuXG5cbi8qXG5Ub2dnbGVhYmxlIFNlY3Rpb25zXG4qL1xuXG52YXIgdG9nZ2xlU2VjdGlvbnMgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdG9nZ2xlLXNlY3Rpb24nKVxudG9nZ2xlU2VjdGlvbnMoKVxuXG5cblxuXG52YXIgaGV4RGlnaXRzID0gbmV3IEFycmF5KCcwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJyk7XG5cbnZhciByZ2IyaGV4ID0gZnVuY3Rpb24ocmdiKSB7XG4gIHJnYiA9IHJnYi5tYXRjaCgvXnJnYlxcKChcXGQrKSxcXHMqKFxcZCspLFxccyooXFxkKylcXCkkLyk7XG4gIHJldHVybiAnIycgKyBoZXhfdmFsdWUocmdiWzFdKSArIGhleF92YWx1ZShyZ2JbMl0pICsgaGV4X3ZhbHVlKHJnYlszXSk7XG59O1xuXG52YXIgaGV4X3ZhbHVlID0gZnVuY3Rpb24oeCkge1xuICBpZiAoaXNOYU4oeCkpIHtcbiAgICByZXR1cm4gJzAwJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaGV4RGlnaXRzWyh4IC0gKHggJSAxNikpIC8gMTZdICsgaGV4RGlnaXRzW3ggJSAxNl07XG4gIH1cbn07XG5cbnZhciBkZXRlY3RDb2xvcnMgPSBmdW5jdGlvbihpbWFnZSkge1xuICB2YXIgY29sb3JUaGllZiwgZGV0ZWN0ZWRfY29sb3JzLCBoZXgsIGksIHJlc3VsdHM7XG4gIGNvbG9yVGhpZWYgPSBuZXcgQ29sb3JUaGllZjtcbiAgZGV0ZWN0ZWRfY29sb3JzID0gQXJyYXkoKTtcbiAgZGV0ZWN0ZWRfY29sb3JzID0gY29sb3JUaGllZi5nZXRQYWxldHRlKGltYWdlLCA1KTtcbiAgJCgnLnBhbGV0dGVDb2xvcnMnKS5lbXB0eSgpO1xuICBpID0gZGV0ZWN0ZWRfY29sb3JzLmxlbmd0aCAtIDE7XG4gIHJlc3VsdHMgPSBbXTtcbiAgd2hpbGUgKGkgPj0gMCkge1xuICAgIGhleCA9IHJnYjJoZXgoJ3JnYignICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzBdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzFdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzJdICsgJyknKTtcbiAgICAkKCcucGFsZXR0ZUNvbG9ycycpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImNvbG9yXCIgZGF0YS1oZXg9XCInICsgaGV4ICsgJ1wiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogcmdiKCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMF0gKyAnLCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMV0gKyAnLCcgKyBkZXRlY3RlZF9jb2xvcnNbaV1bMl0gKyAnKTtcIj48L2Rpdj4nKTtcbiAgICByZXN1bHRzLnB1c2goaS0tKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cblxuXG5cblxuLypcbkNvbG9yIFBpY2tlclxuVE9ETzogcmVmYWN0b3IgdGhpcyBpbnRvIGEgbW9kdWxlXG4qL1xuXG4oZnVuY3Rpb24oJCkge1xuXG4gIC8vIENPTE9SIFBJQ0tFUlxuICB2YXIgY29sb3JfcGlja2VyX29wdGlvbnMgPSB7XG4gICAgY29udHJvbDogJ3doZWVsJyxcbiAgICBwb3NpdGlvbjogJ3JpZ2h0J1xuICB9O1xuXG5cbiAgLy8gSW5pdCBjb2xvcnBpY2tlcnNcbiAgJCgnI2NvbG9yUGlja2VyMScpLm1pbmljb2xvcnMoY29sb3JfcGlja2VyX29wdGlvbnMpO1xuICAkKCcjY29sb3JQaWNrZXIyJykubWluaWNvbG9ycyhjb2xvcl9waWNrZXJfb3B0aW9ucyk7XG5cbiAgLy8gU2V0IHRoZSBsYXN0IGFjdGl2ZSBjb2xvciBwaWNrZXIgd2hlbiBjbGlja2VkXG4gIHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIgPSBmYWxzZTtcbiAgJCgnI2NvbG9yUGlja2VyMSwgI2NvbG9yUGlja2VyMicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyID0gJCh0aGlzKTtcbiAgfSk7XG4gIFxuICAvLyBXaGVuIGNsaWNraW5nIGEgZGV0ZWN0ZWQgY29sb3IsIGFwcGx5IGl0IHRvIHRoZSBsYXN0IHNlbGVjdGVkIGNvbG9ycGlja2VyXG4gICQoJy5wYWxldHRlQ29sb3JzJykub24oJ2NsaWNrJywgJy5jb2xvcicsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKHdpbmRvdy5sYXN0X2FjdGl2ZV9jb2xvcl9waWNrZXIpO1xuICAgIGlmICh3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyKSB7XG4gICAgICB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyLnZhbCgkKHRoaXMpLmRhdGEoJ2hleCcpKTtcbiAgICAgIHJldHVybiB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyLm1pbmljb2xvcnMoJ3ZhbHVlJywgJCh0aGlzKS5kYXRhKCdoZXgnKSk7XG4gICAgfVxuICB9KTtcbiAgLy8gQ09MT1IgUElDS0VSXG5cblxuICAvLyBEZXRlY3QgdGhlIGNvbG9ycyBmcm9tIHRoZSBzYXZlZCBpbWFnZSB1c2luZyBjb2xvcnRoaWVmXG4gICQoJyNyZWZyZXNoRGV0ZWN0ZWRDb2xvcnMnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgdmFyIGltZztcbiAgICBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gY3JvcHBlci5nZXREYXRhVVJMKCk7XG4gICAgZGV0ZWN0Q29sb3JzKGltZyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuXG5cbiAgLy8gVXBkYXRlIHRoZSBidXNpbmVzcyBwcmV2aWV3XG4gIHJldHVybiB1cGRhdGVQcmV2aWV3ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRleHQ7XG4gICAgJCgnLnByZXZpZXdIZWFkZXInKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAkKCcjY29sb3JQaWNrZXIxJykudmFsKCkpO1xuICAgICQoJy5jb250ZW50LCAuc29jaWFsRm9vdGVyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJCgnI2NvbG9yUGlja2VyMicpLnZhbCgpKTtcbiAgICAkKCcucHJldmlld0hlYWRlciBpbWcnKS5hdHRyKCdzcmMnLCAkKCcudGhlSW1hZ2UnKS52YWwoKSk7XG4gICAgJCgnLmNvbnRlbnQgaDEnKS5odG1sKCQoJy5idXNpbmVzc05hbWUnKS52YWwoKSk7XG4gICAgdGV4dCA9ICQoJy5hZGRyZXNzJykudmFsKCkgKyAnICcgKyAkKCcuYWRkcmVzczInKS52YWwoKSArICcgJyArICQoJy5jaXR5JykudmFsKCkgKyAnICcgKyAkKCcuc3RhdGUnKS52YWwoKSArICcgJyArICQoJy56aXBDb2RlJykudmFsKCk7XG4gICAgcmV0dXJuICQoJy5jb250ZW50IHAnKS5odG1sKHRleHQpO1xuICB9O1xuXG59KShqUXVlcnkpOyJdfQ==
