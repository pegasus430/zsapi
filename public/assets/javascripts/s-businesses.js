(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvY29tcG9uZW50cy9tb2JpbGUtcHJldmlldy13YXRjaGVycy5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9jb21wb25lbnRzL3RvZ2dsZS1zZWN0aW9uLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL3MtYnVzaW5lc3Nlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDak1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubG9nbyBDaGFuZ2VzXG4qL1xuXG52YXIgbW9zdFJlY2VudExvZ28gPSAkKCcjc2F2ZWRfaW1hZ2VfMScpXG5cbnZhciBwcmV2aWV3SW1hZ2VfYXNJbWFnZSA9ICQoJyNwcmV2aWV3LWltYWdlLWFzLWltYWdlJylcbnZhciBwcmV2aWV3SW1hZ2VfYXNCZyA9ICQoJyNwcmV2aWV3LWltYWdlLWFzLWJnJylcblxuXG52YXIgbW9zdFJlY2VudExvZ29TcmNcbnZhciBoYW5kbGVMb2dvID0gZnVuY3Rpb24oKSB7XG4gIFxuICAvLyBHZXQgc3JjXG4gIG1vc3RSZWNlbnRMb2dvU3JjID0gbW9zdFJlY2VudExvZ29bMF0uY3VycmVudFNyY1xuXG4gIC8vIFVwZGF0ZTogXG5cbiAgLy8gLSBjb3JlIGxvZ29cbiAgcHJldmlld0ltYWdlX2FzSW1hZ2UuYXR0cignc3JjJywgbW9zdFJlY2VudExvZ29TcmMpXG4gIC8vIC0gYmFja2dyb3VuZCBpbWFnZVxuICBwcmV2aWV3SW1hZ2VfYXNCZy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCBtb3N0UmVjZW50TG9nb1NyYylcbn1cblxuXG5cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUHJpbWFyeSBhbmQgU2Vjb25kYXkgQ29sb3IgQ2hhbmdzXG4qL1xuXG5cbnZhciBtb3N0UmVjZW50UHJpbWFyeVxudmFyIG1vc3RSZWNlbnRTZWNvbmRhcnlcbnZhciBoYW5kbGVDb2xvcnMgPSBmdW5jdGlvbigpIHtcblxuICAvLyBHZXQgcHJpbWFyeVxuICB2YXIgbW9zdFJlY2VudFByaW1hcnkgPSAkKCcjY29sb3JQaWNrZXIxJykubmV4dCgpLmZpbmQoJy5taW5pY29sb3JzLXN3YXRjaC1jb2xvcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicpXG4gIC8vIEdldCBzZWNvbmRhcnlcbiAgLy8gc2Vjb25kYXJ5IGNvbG9yIGlzbid0IGN1cnJlbnRseSB1c2VkIGluIHByZXZpZXcuLi4gY29tbWVudGluZyBvdXQgZm9yIG5vd1xuICAvLyB2YXIgbW9zdFJlY2VudFNlY29uZGFyeSA9ICQoJyNjb2xvclBpY2tlcjInKS5uZXh0KCkuZmluZCgnLm1pbmljb2xvcnMtc3dhdGNoLWNvbG9yJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJylcblxuXG4gIC8vIFVwZGF0ZTogXG5cbiAgJCgnLnByZXZpZXdQcmltYXJ5QmcnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgbW9zdFJlY2VudFByaW1hcnkpXG4gIH0pXG5cbn1cblxuXG5cblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIExpc3RlbiBmb3IgcHJldmlldyBzaG93XG4gICovXG5cblxuICAkKFwiW2RhdGEtdGFyZ2V0PScjcHJldmlld01vZGFsJ11cIikuY2xpY2soZnVuY3Rpb24oKSB7XG5cbiAgICBoYW5kbGVMb2dvKClcblxuICAgIGhhbmRsZUNvbG9ycygpXG5cbiAgfSlcblxuXG59IiwiLypcblxuVG9nZ2xlIFNlY3Rpb25zXG5cbkFkZG9yZGlhbi1saWtlIGZ1bmN0aW9uYWxpdHkgZm9yIHBhZ2Ugc2VjdGlvbnNcblxuTm90ZXM6XG4tIHRyYW5zaXRpb24gb24gaGVpZ2h0IGlzIGhhbmRsZWQgdmlhIGNzc1xuXG4qL1xuXG5cblxuXG5cbnZhciB0b2dnbGVTZWN0aW9ucyA9ICQoJy50b2dnbGUtc2VjdGlvbicpXG52YXIgaGVpZ2h0XG52YXIgc2VjdGlvbkhlaWdodFxudmFyIHNlY3Rpb25Ub1Nob3dcbnZhciBjdXJyZW50SURcbnZhciBuZXh0QnRucyA9ICQoJy50b2dnbGUtc2VjdGlvbl9idG4tbmV4dCcpXG52YXIgcHJldkJ0bnMgPSAkKCcudG9nZ2xlLXNlY3Rpb25fYnRuLXByZXYnKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cblxuXG4gIC8vIE9uY2UgaW1hZ2VzIGhhdmUgbG9hZGVkLCBzZXQgdGhlIHRvZ2dsZSBzZWN0aW9uc1xuXG4gICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgLy8gRmlyc3QsIHJlbW92ZSBmaXJzdCBhbmQgbGFzdCBidG5zXG5cbiAgICByZW1vdmVGaXJzdEFuZExhc3RCdG5zKCkgXG5cbiAgICB0b2dnbGUoKVxuICAgIFxuXG4gICAgLy8gU2V0IGV2ZW50IGxpc3RlbmVycyBvbiB0aGUgbmV4dC9wcmV2IGJ0bnNcbiAgICBzZXRCdXR0b25zKClcblxuICB9KVxuXG5cblxufSAvLyBlbmQgZXhwb3J0c1xuXG5cblxuXG52YXIgdG9nZ2xlID0gZnVuY3Rpb24oKSB7XG5cblxuICB0b2dnbGVTZWN0aW9ucy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHZhciBzZWN0aW9uID0gJCh0aGlzKVxuXG5cbiAgICAgIC8vIEhlaWdodCBpcyBzZXQgdG8gMCBpbiBjc3NcbiAgICAgIC8vIGJ5IHVzaW5nIHRoZSBpbmNyZWRpYmx5IG5pZmZ0eSBzY3JvbGxIZWlnaHQsIFxuICAgICAgLy8gd2UgY2FuIGdldCB0aGUgaGVpZ2h0IGFueXdheXMgXG4gICAgICAvLyBzZWU6IFxuICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MDAzMjIwL2phdmFzY3JpcHQtanF1ZXJ5LWFuaW1hdGUtdG8tYXV0by1oZWlnaHQjYW5zd2VyLTI0NzYyODQ4XG4gICAgICBoZWlnaHQgPSBzZWN0aW9uLmdldCgwKS5zY3JvbGxIZWlnaHRcblxuXG4gICAgICAvLyBTdG9yZSBoZWlnaHRcbiAgICAgIHNlY3Rpb24uYXR0cignZGF0YS1oZWlnaHQnLCBoZWlnaHQpXG5cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgc2VjdGlvbjpcbiAgICAgIC8vIC0gYWRkIGlkIHdpdGggdGhlIHNlY3Rpb24ncyBpbmRleFxuICAgICAgc2VjdGlvbi5hdHRyKCdkYXRhLXRvZ2dsZS10YXJnZXQnLCAndG9nZ2xlLScraSlcblxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSBoZWFkaW5nOlxuICAgICAgLy8gYWRkIGNsYXNzIChmb3IgcHJvcGVyIHN0eWxpbmcpXG4gICAgICAvLyAobm90ZTogdGhpcyBjb3VsZCBiZSBkb25lIGluIGFkdmFuY2UgaW4gdGhlIGRvbSwgXG4gICAgICAvLyBidXQgSSdtIHVuc3VyZSBpZiB0aGlzIGlzIHdvcnRoIHRoZSBlZmZvcnQuLi5cbiAgICAgIC8vIGFzIHRoZSBjdXJyZW50IHJhaWxzIGhlbHBlciBkb2Vzbid0IHlldCBhbGxvdyBmb3IgdGhpcylcbiAgICAgIHNlY3Rpb24ucHJldigpLmZpbmQoJ2gyJylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ3RvZ2dsZS0nK2kpXG4gICAgICAgIC5hZGRDbGFzcygnc2VjdGlvbi10b2dnbGUnKVxuXG5cblxuICAgICAgLy8gQ2xpY2sgTGlzdGVuZXJcbiAgICAgIC8vIFNjb3BlZCB0byB0aGUgZG9jdW1lbnQsIG1ha2luZyB1c2Ugb2YgalF1ZXJ5J3MgY29udmllbmNlLWJlaGF2aW9yIFxuICAgICAgLy8gd2hpY2ggcHJldmVudHMgdGhlIG5lZWQgZm9yIGEgY2xvc3VyZSAob3RoZXJ3aXNlIG5lZWRlZCB3aGVuIFxuICAgICAgLy8gYXR0YWNoaW5nIGV2ZW50IGhhbmRsZXJzIGluc2lkZSBvZiBhIGxvb3AsIGFzIEpTIGV2YWx1YXRlcyBmdW5jdGlvbnNcbiAgICAgIC8vIGF0IHRoZSB0aW1lIG9mIGV4ZWN1dGlvbilcblxuICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgKCcjdG9nZ2xlLScraSksIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG4gICAgICAgIFxuICAgICAgICB1cGRhdGVUb2dnbGUoJHRoaXMpXG5cbiAgICAgIH0pIC8vIGVuZCBjbGljayBoYW5kbGVyICBcblxuICAgIH0pIC8vIGVuZCBsb29wXG5cblxuICAvKlxuICBTZXQgZmlyc3QgdG8gb3BlblxuICAqL1xuXG4gIHZhciBmaXN0U2VjdGlvbiA9ICQoJyN0b2dnbGUtMCcpXG4gIHVwZGF0ZVRvZ2dsZShmaXN0U2VjdGlvbilcblxuICAgICAgXG59XG5cblxuXG5cblxuXG5cblxuXG52YXIgdXBkYXRlVG9nZ2xlID0gZnVuY3Rpb24odGFyZ2V0KSB7XG5cblxuICAvLyBDbG9zZSBwcmV2aW91c2x5IG9wZW4gc2VjdGlvblxuICAkKCcudG9nZ2xlLXNlY3Rpb24nKS5hdHRyKCdzdHlsZScsICdoZWlnaHQ6IDAnKVxuICAkKCcuc2VjdGlvbi10b2dnbGUnKS5yZW1vdmVDbGFzcygnb3BlbicpXG5cblxuICAvKlxuICBPcGVuIGNsaWNrZWQgc2VjdGlvblxuICAqL1xuXG4gIC8vIEFkZCBvcGVuIGNsYXNzIHRvIGhlYWRpbmcgKHdoaWNoIGVmZmVjdGl2ZWx5IGNoYW5nZXMgXG4gIC8vIHRoZSBwbHVzIHRvIGEgbWludXMsIHZpYSB0aGUgY3NzKVxuXG4gIHRhcmdldC5hZGRDbGFzcygnb3BlbicpXG5cblxuICAvLyBHcmFiIHRoZSBjbGlja2VkIGhlYWRpbmcncyBpZFxuXG4gIGN1cnJlbnRJRCA9IHRhcmdldC5hdHRyKCdpZCcpXG4gIFxuXG4gIC8vIGNhY2hlIHRoZSBzZWN0aW9uIHRvIHNob3csXG4gIC8vIHNlbGVjdGluZyB2aWEgdGhlIGRhdGEtdG9nZ2xlLXRhcmdldCwgd2hpY2ggaXMgc2V0IHRvIFxuICAvLyBpdCdzIHJlc3BlY3RpdmUgaGVhZGluZydzIGlkXG5cbiAgc2VjdGlvblRvU2hvdyA9ICQoJ1tkYXRhLXRvZ2dsZS10YXJnZXQ9XCInK2N1cnJlbnRJRCsnXCJdJylcblxuXG4gIC8vIGdyYWIgdGhlIHRhcmdldCBzZWN0aW9uJ3MgaGVpZ2h0XG5cbiAgc2VjdGlvbkhlaWdodCA9IHNlY3Rpb25Ub1Nob3cuZGF0YSgnaGVpZ2h0JykgKyAncHgnO1xuXG5cbiAgLy8gc2hvdyBpdFxuXG4gIHNlY3Rpb25Ub1Nob3cuYXR0cignc3R5bGUnLCAnaGVpZ2h0OiAnK3NlY3Rpb25IZWlnaHQpXG5cblxufVxuXG5cblxuXG5cbnZhciBzZXRCdXR0b25zID0gZnVuY3Rpb24oKSB7XG5cbiAgbmV4dEJ0bnMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgJCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgdXBkYXRlVG9nZ2xlKCQoJyN0b2dnbGUtJysoaSsxKSkpXG5cbiAgICB9KVxuICB9KVxuXG4gIHByZXZCdG5zLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIHVwZGF0ZVRvZ2dsZSgkKCcjdG9nZ2xlLScrKGktMSkpKVxuXG4gICAgfSlcbiAgfSlcblxufVxuXG5cblxudmFyIHJlbW92ZUZpcnN0QW5kTGFzdEJ0bnMgPSBmdW5jdGlvbigpIHtcbiAgcHJldkJ0bnMuZmlyc3QoKS5hZGRDbGFzcygnaGlkZGVuJylcbiAgbmV4dEJ0bnMubGFzdCgpLmFkZENsYXNzKCdoaWRkZW4nKVxufSIsIi8vIHRvZG86IHJlZmFjdG9yIHRoZXNlIGludG8gaGVscGVyIG1vZHVsZShzKVxuXG5cbi8qXG5XYXRjaCBmb3IgY2hhbmdlcyBvbiBidXNpbmVzcyBcbmxvZ28gYW5kIHN0eWxlcyBhbmQgdXBkYXRlIHRoZVxubW9iaWxlIHByZXZpZXcgYWNjb3JkaW5nbHlcbiovXG5cbnZhciBtb2JpbGVQcmV2aWV3V2F0Y2ggPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbW9iaWxlLXByZXZpZXctd2F0Y2hlcnMnKVxubW9iaWxlUHJldmlld1dhdGNoKClcblxuXG4vKlxuVG9nZ2xlYWJsZSBTZWN0aW9uc1xuKi9cblxudmFyIHRvZ2dsZVNlY3Rpb25zID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RvZ2dsZS1zZWN0aW9uJylcbnRvZ2dsZVNlY3Rpb25zKClcblxuXG5cblxudmFyIGhleERpZ2l0cyA9IG5ldyBBcnJheSgnMCcsICcxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICdhJywgJ2InLCAnYycsICdkJywgJ2UnLCAnZicpO1xuXG52YXIgcmdiMmhleCA9IGZ1bmN0aW9uKHJnYikge1xuICByZ2IgPSByZ2IubWF0Y2goL15yZ2JcXCgoXFxkKyksXFxzKihcXGQrKSxcXHMqKFxcZCspXFwpJC8pO1xuICByZXR1cm4gJyMnICsgaGV4X3ZhbHVlKHJnYlsxXSkgKyBoZXhfdmFsdWUocmdiWzJdKSArIGhleF92YWx1ZShyZ2JbM10pO1xufTtcblxudmFyIGhleF92YWx1ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgaWYgKGlzTmFOKHgpKSB7XG4gICAgcmV0dXJuICcwMCc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGhleERpZ2l0c1soeCAtICh4ICUgMTYpKSAvIDE2XSArIGhleERpZ2l0c1t4ICUgMTZdO1xuICB9XG59O1xuXG52YXIgZGV0ZWN0Q29sb3JzID0gZnVuY3Rpb24oaW1hZ2UpIHtcbiAgdmFyIGNvbG9yVGhpZWYsIGRldGVjdGVkX2NvbG9ycywgaGV4LCBpLCByZXN1bHRzO1xuICBjb2xvclRoaWVmID0gbmV3IENvbG9yVGhpZWY7XG4gIGRldGVjdGVkX2NvbG9ycyA9IEFycmF5KCk7XG4gIGRldGVjdGVkX2NvbG9ycyA9IGNvbG9yVGhpZWYuZ2V0UGFsZXR0ZShpbWFnZSwgNSk7XG4gICQoJy5wYWxldHRlQ29sb3JzJykuZW1wdHkoKTtcbiAgaSA9IGRldGVjdGVkX2NvbG9ycy5sZW5ndGggLSAxO1xuICByZXN1bHRzID0gW107XG4gIHdoaWxlIChpID49IDApIHtcbiAgICBoZXggPSByZ2IyaGV4KCdyZ2IoJyArIGRldGVjdGVkX2NvbG9yc1tpXVswXSArICcsJyArIGRldGVjdGVkX2NvbG9yc1tpXVsxXSArICcsJyArIGRldGVjdGVkX2NvbG9yc1tpXVsyXSArICcpJyk7XG4gICAgJCgnLnBhbGV0dGVDb2xvcnMnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjb2xvclwiIGRhdGEtaGV4PVwiJyArIGhleCArICdcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHJnYignICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzBdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzFdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzJdICsgJyk7XCI+PC9kaXY+Jyk7XG4gICAgcmVzdWx0cy5wdXNoKGktLSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG5cblxuXG5cbi8qXG5Db2xvciBQaWNrZXJcblRPRE86IHJlZmFjdG9yIHRoaXMgaW50byBhIG1vZHVsZVxuKi9cblxuKGZ1bmN0aW9uKCQpIHtcblxuICAvLyBDT0xPUiBQSUNLRVJcbiAgdmFyIGNvbG9yX3BpY2tlcl9vcHRpb25zID0ge1xuICAgIGNvbnRyb2w6ICd3aGVlbCcsXG4gICAgcG9zaXRpb246ICdyaWdodCdcbiAgfTtcblxuXG4gIC8vIEluaXQgY29sb3JwaWNrZXJzXG4gICQoJyNjb2xvclBpY2tlcjEnKS5taW5pY29sb3JzKGNvbG9yX3BpY2tlcl9vcHRpb25zKTtcbiAgJCgnI2NvbG9yUGlja2VyMicpLm1pbmljb2xvcnMoY29sb3JfcGlja2VyX29wdGlvbnMpO1xuXG4gIC8vIFNldCB0aGUgbGFzdCBhY3RpdmUgY29sb3IgcGlja2VyIHdoZW4gY2xpY2tlZFxuICB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyID0gZmFsc2U7XG4gICQoJyNjb2xvclBpY2tlcjEsICNjb2xvclBpY2tlcjInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlciA9ICQodGhpcyk7XG4gIH0pO1xuICBcbiAgLy8gV2hlbiBjbGlja2luZyBhIGRldGVjdGVkIGNvbG9yLCBhcHBseSBpdCB0byB0aGUgbGFzdCBzZWxlY3RlZCBjb2xvcnBpY2tlclxuICAkKCcucGFsZXR0ZUNvbG9ycycpLm9uKCdjbGljaycsICcuY29sb3InLCBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyh3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyKTtcbiAgICBpZiAod2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlcikge1xuICAgICAgd2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlci52YWwoJCh0aGlzKS5kYXRhKCdoZXgnKSk7XG4gICAgICByZXR1cm4gd2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlci5taW5pY29sb3JzKCd2YWx1ZScsICQodGhpcykuZGF0YSgnaGV4JykpO1xuICAgIH1cbiAgfSk7XG4gIC8vIENPTE9SIFBJQ0tFUlxuXG5cbiAgLy8gRGV0ZWN0IHRoZSBjb2xvcnMgZnJvbSB0aGUgc2F2ZWQgaW1hZ2UgdXNpbmcgY29sb3J0aGllZlxuICAkKCcjcmVmcmVzaERldGVjdGVkQ29sb3JzJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIHZhciBpbWc7XG4gICAgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9IGNyb3BwZXIuZ2V0RGF0YVVSTCgpO1xuICAgIGRldGVjdENvbG9ycyhpbWcpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuXG4gIC8vIFVwZGF0ZSB0aGUgYnVzaW5lc3MgcHJldmlld1xuICByZXR1cm4gdXBkYXRlUHJldmlldyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0ZXh0O1xuICAgICQoJy5wcmV2aWV3SGVhZGVyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJCgnI2NvbG9yUGlja2VyMScpLnZhbCgpKTtcbiAgICAkKCcuY29udGVudCwgLnNvY2lhbEZvb3RlcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICQoJyNjb2xvclBpY2tlcjInKS52YWwoKSk7XG4gICAgJCgnLnByZXZpZXdIZWFkZXIgaW1nJykuYXR0cignc3JjJywgJCgnLnRoZUltYWdlJykudmFsKCkpO1xuICAgICQoJy5jb250ZW50IGgxJykuaHRtbCgkKCcuYnVzaW5lc3NOYW1lJykudmFsKCkpO1xuICAgIHRleHQgPSAkKCcuYWRkcmVzcycpLnZhbCgpICsgJyAnICsgJCgnLmFkZHJlc3MyJykudmFsKCkgKyAnICcgKyAkKCcuY2l0eScpLnZhbCgpICsgJyAnICsgJCgnLnN0YXRlJykudmFsKCkgKyAnICcgKyAkKCcuemlwQ29kZScpLnZhbCgpO1xuICAgIHJldHVybiAkKCcuY29udGVudCBwJykuaHRtbCh0ZXh0KTtcbiAgfTtcblxufSkoalF1ZXJ5KTsiXX0=
