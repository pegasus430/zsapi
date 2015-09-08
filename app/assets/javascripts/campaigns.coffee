#= require jquery.Jcrop
# require croppic/croppic
#= require shared/files

handleUploadedImage = (fileInput) ->
  # Assign file var
  file = fileInput.files[0]

  # Mime check
  if !file || !file.type.match(/image.*/)
    return

  # Modal image
  modal_image = $("#modal_image")

  # Add the image to the crop popup
  reader = new FileReader
  reader.onload = (e) ->  
    modal_image.attr "src", e.target.result
    modal_image.Jcrop
      onChange: showImagePreview,
      onSelect: showImagePreview,
      aspectRatio: 1.235,
      minSize: [210,170]
  reader.readAsDataURL file


  


# Show the preview
# Handle the live coordinates of the image crop
#crop_image_container img
showImagePreview = (c) ->
  $('#imgX1').val(c.x);
  $('#imgY1').val(c.y);
  $('#imgWidth').val(c.w);
  $('#imgHeight').val(c.h);
  $('#crop_btn').show();



# START JQUERY
(($) ->
  $('.file_field').change ->
    handleUploadedImage this


  # Close the modal and set the IMG when crop is saved
  $('#crop_btn').click () ->
    x1 = $('#imgX1').val
    y1 = $('#imgY1').val
    width = $('#imgWidth').val
    height = $('#imgHeight').val
    context = $("#canvas")[0].getContext("2d")
    console.log context
    if context
      img = new Image
      img.src = $('#Image1').attr("src")
      img.complete = ->
        canvas.height = height
        canvas.width = width
        context.drawImage(img, x1, y1, width, height, 0, 0, width, height)
        # $('#imgCropped').val(canvas.toDataURL())
        return
      $('#cropImageModal').modal 'hide'
    else
      alert 'canvas not supported'








  ###SHOW CUSTOM DAYS SELECTOR ###
  $('.daysOfTheMonth .radio').click (e) ->
    if $('.customDays').find('input').is(':checked')
      $('.customDaySelector').addClass 'active'
    else
      $('.customDaySelector').removeClass 'active'
    return


  # DATE PICKER!
  if $('.input-group.date').length
    $('.input-group.date').datepicker
      autoclose:      true
      orientation:    'top'
      todayHighlight: true


  # DAYs PICKER
  if $('.customDaySelector').length
    $('.customDaySelector').datepicker
      startDate:          '05/01/2016'
      endDate:            '05/31/2016'
      multidate:          true
      multidateSeparator: ','
      calendarWeeks:      true
      todayHighlight:     true

    $('.customDaySelector').on 'changeDate', (event) ->
      dates = new Array
      day = new Array
      aux = ''
      dates = $('.customDaySelector').datepicker('getFormattedDate').split(',')
      i = dates.length - 1
      while i >= 0
        day = dates[i].split('/')
        aux = aux + day[1] + ','
        i--
      $('#customDaySelector_input').val aux
      return
) jQuery