#= require minicolors/jquery.minicolors
#= require color-thief/color-thief
#= require shared/cropbox_setup

hexDigits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f')
rgb2hex = (rgb) ->
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  '#' + hex_value(rgb[1]) + hex_value(rgb[2]) + hex_value(rgb[3])
hex_value = (x) ->
  if isNaN(x) then '00' else hexDigits[(x - (x % 16)) / 16] + hexDigits[x % 16]

detectColors = (image) ->
  colorThief = new ColorThief
  detected_colors = Array()
  detected_colors = colorThief.getPalette(image, 5)
  $('.paletteColors').empty()
  i = detected_colors.length - 1
  while i >= 0
    hex = rgb2hex('rgb(' + detected_colors[i][0] + ',' + detected_colors[i][1] + ',' + detected_colors[i][2] + ')')
    $('.paletteColors').append '<div class="color" data-hex="' + hex + '" style="background-color: rgb(' + detected_colors[i][0] + ',' + detected_colors[i][1] + ',' + detected_colors[i][2] + ');"></div>'
    i--
    

(($) ->
	##+ COLOR PICKER
  color_picker_options =
    control:  'wheel'
    position: 'right'

  # Init colorpickers
  $('#colorPicker1').minicolors color_picker_options
  $('#colorPicker2').minicolors color_picker_options

  # Set the last active color picker when clicked
  window.last_active_color_picker = false
  $('#colorPicker1, #colorPicker2').click ->
    window.last_active_color_picker = $(this)

  # When clicking a detected color, apply it to the last selected colorpicker
  $('.paletteColors').on 'click', '.color', ->
    console.log window.last_active_color_picker
    if window.last_active_color_picker
      window.last_active_color_picker.val $(this).data('hex')
      window.last_active_color_picker.minicolors 'value', $(this).data('hex')
  ##- COLOR PICKER


  # Detect the colors from the saved image using colorthief
  $('#refreshDetectedColors').click (e) ->
    img = new Image()
    img.src = window.cropper.getDataURL()
    detectColors(img)
    return false
    e.preventDefault()


  # Update the business preview
  updatePreview = ->
    $('.previewHeader').css 'background-color', $('#colorPicker1').val()
    $('.content, .socialFooter').css 'background-color', $('#colorPicker2').val()
    $('.previewHeader img').attr 'src', $('.theImage').val()
    $('.content h1').html $('.businessName').val()
    text = $('.address').val() + ' ' + $('.address2').val() + ' ' + $('.city').val() + ' ' + $('.state').val() + ' ' + $('.zipCode').val()
    $('.content p').html text

) jQuery