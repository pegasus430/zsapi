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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL3MtYnVzaW5lc3Nlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIHRvZG86IHJlZmFjdG9yIHRoZXNlIGludG8gaGVscGVyIG1vZHVsZShzKVxuXG5cblxudmFyIGhleERpZ2l0cyA9IG5ldyBBcnJheSgnMCcsICcxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICdhJywgJ2InLCAnYycsICdkJywgJ2UnLCAnZicpO1xuXG52YXIgcmdiMmhleCA9IGZ1bmN0aW9uKHJnYikge1xuICByZ2IgPSByZ2IubWF0Y2goL15yZ2JcXCgoXFxkKyksXFxzKihcXGQrKSxcXHMqKFxcZCspXFwpJC8pO1xuICByZXR1cm4gJyMnICsgaGV4X3ZhbHVlKHJnYlsxXSkgKyBoZXhfdmFsdWUocmdiWzJdKSArIGhleF92YWx1ZShyZ2JbM10pO1xufTtcblxudmFyIGhleF92YWx1ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgaWYgKGlzTmFOKHgpKSB7XG4gICAgcmV0dXJuICcwMCc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGhleERpZ2l0c1soeCAtICh4ICUgMTYpKSAvIDE2XSArIGhleERpZ2l0c1t4ICUgMTZdO1xuICB9XG59O1xuXG52YXIgZGV0ZWN0Q29sb3JzID0gZnVuY3Rpb24oaW1hZ2UpIHtcbiAgdmFyIGNvbG9yVGhpZWYsIGRldGVjdGVkX2NvbG9ycywgaGV4LCBpLCByZXN1bHRzO1xuICBjb2xvclRoaWVmID0gbmV3IENvbG9yVGhpZWY7XG4gIGRldGVjdGVkX2NvbG9ycyA9IEFycmF5KCk7XG4gIGRldGVjdGVkX2NvbG9ycyA9IGNvbG9yVGhpZWYuZ2V0UGFsZXR0ZShpbWFnZSwgNSk7XG4gICQoJy5wYWxldHRlQ29sb3JzJykuZW1wdHkoKTtcbiAgaSA9IGRldGVjdGVkX2NvbG9ycy5sZW5ndGggLSAxO1xuICByZXN1bHRzID0gW107XG4gIHdoaWxlIChpID49IDApIHtcbiAgICBoZXggPSByZ2IyaGV4KCdyZ2IoJyArIGRldGVjdGVkX2NvbG9yc1tpXVswXSArICcsJyArIGRldGVjdGVkX2NvbG9yc1tpXVsxXSArICcsJyArIGRldGVjdGVkX2NvbG9yc1tpXVsyXSArICcpJyk7XG4gICAgJCgnLnBhbGV0dGVDb2xvcnMnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjb2xvclwiIGRhdGEtaGV4PVwiJyArIGhleCArICdcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHJnYignICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzBdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzFdICsgJywnICsgZGV0ZWN0ZWRfY29sb3JzW2ldWzJdICsgJyk7XCI+PC9kaXY+Jyk7XG4gICAgcmVzdWx0cy5wdXNoKGktLSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG5cblxuXG5cbi8qXG5Db2xvciBQaWNrZXJcblRPRE86IHJlZmFjdG9yIHRoaXMgaW50byBhIG1vZHVsZVxuKi9cblxuKGZ1bmN0aW9uKCQpIHtcblxuICAvLyBDT0xPUiBQSUNLRVJcbiAgdmFyIGNvbG9yX3BpY2tlcl9vcHRpb25zID0ge1xuICAgIGNvbnRyb2w6ICd3aGVlbCcsXG4gICAgcG9zaXRpb246ICdyaWdodCdcbiAgfTtcblxuXG4gIC8vIEluaXQgY29sb3JwaWNrZXJzXG4gICQoJyNjb2xvclBpY2tlcjEnKS5taW5pY29sb3JzKGNvbG9yX3BpY2tlcl9vcHRpb25zKTtcbiAgJCgnI2NvbG9yUGlja2VyMicpLm1pbmljb2xvcnMoY29sb3JfcGlja2VyX29wdGlvbnMpO1xuXG4gIC8vIFNldCB0aGUgbGFzdCBhY3RpdmUgY29sb3IgcGlja2VyIHdoZW4gY2xpY2tlZFxuICB3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyID0gZmFsc2U7XG4gICQoJyNjb2xvclBpY2tlcjEsICNjb2xvclBpY2tlcjInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlciA9ICQodGhpcyk7XG4gIH0pO1xuICBcbiAgLy8gV2hlbiBjbGlja2luZyBhIGRldGVjdGVkIGNvbG9yLCBhcHBseSBpdCB0byB0aGUgbGFzdCBzZWxlY3RlZCBjb2xvcnBpY2tlclxuICAkKCcucGFsZXR0ZUNvbG9ycycpLm9uKCdjbGljaycsICcuY29sb3InLCBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyh3aW5kb3cubGFzdF9hY3RpdmVfY29sb3JfcGlja2VyKTtcbiAgICBpZiAod2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlcikge1xuICAgICAgd2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlci52YWwoJCh0aGlzKS5kYXRhKCdoZXgnKSk7XG4gICAgICByZXR1cm4gd2luZG93Lmxhc3RfYWN0aXZlX2NvbG9yX3BpY2tlci5taW5pY29sb3JzKCd2YWx1ZScsICQodGhpcykuZGF0YSgnaGV4JykpO1xuICAgIH1cbiAgfSk7XG4gIC8vIENPTE9SIFBJQ0tFUlxuXG5cbiAgLy8gRGV0ZWN0IHRoZSBjb2xvcnMgZnJvbSB0aGUgc2F2ZWQgaW1hZ2UgdXNpbmcgY29sb3J0aGllZlxuICAkKCcjcmVmcmVzaERldGVjdGVkQ29sb3JzJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIHZhciBpbWc7XG4gICAgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9IHdpbmRvdy5jcm9wcGVyLmdldERhdGFVUkwoKTtcbiAgICBkZXRlY3RDb2xvcnMoaW1nKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG5cblxuICAvLyBVcGRhdGUgdGhlIGJ1c2luZXNzIHByZXZpZXdcbiAgcmV0dXJuIHVwZGF0ZVByZXZpZXcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGV4dDtcbiAgICAkKCcucHJldmlld0hlYWRlcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICQoJyNjb2xvclBpY2tlcjEnKS52YWwoKSk7XG4gICAgJCgnLmNvbnRlbnQsIC5zb2NpYWxGb290ZXInKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAkKCcjY29sb3JQaWNrZXIyJykudmFsKCkpO1xuICAgICQoJy5wcmV2aWV3SGVhZGVyIGltZycpLmF0dHIoJ3NyYycsICQoJy50aGVJbWFnZScpLnZhbCgpKTtcbiAgICAkKCcuY29udGVudCBoMScpLmh0bWwoJCgnLmJ1c2luZXNzTmFtZScpLnZhbCgpKTtcbiAgICB0ZXh0ID0gJCgnLmFkZHJlc3MnKS52YWwoKSArICcgJyArICQoJy5hZGRyZXNzMicpLnZhbCgpICsgJyAnICsgJCgnLmNpdHknKS52YWwoKSArICcgJyArICQoJy5zdGF0ZScpLnZhbCgpICsgJyAnICsgJCgnLnppcENvZGUnKS52YWwoKTtcbiAgICByZXR1cm4gJCgnLmNvbnRlbnQgcCcpLmh0bWwodGV4dCk7XG4gIH07XG5cbn0pKGpRdWVyeSk7Il19
