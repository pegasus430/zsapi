# require jquery.Jcrop
# require croppic/croppic
#= require cropbox
#= require shared/files

# START JQUERY
(($) ->

  ## START CROPBOX
  options =
    thumbBox: '.thumbBox',
    spinner: '.spinner',
    imgSrc: $("#campaign_image").attr 'src'

  $(".file_field").on 'change', ->
    reader = new FileReader
    reader.onload = (e) ->
      options.imgSrc = e.target.result
      window.cropper = $('#avatarBox').cropbox(options)
    reader.readAsDataURL(this.files[0])
    this.files = []

  # Crop handler.
  $('.btnCrop').on 'click', ->
    img = window.cropper.getDataURL()

    # Place the cropped image's datafile.
    $('.croppedImage').html('<img src="'+img+'" width="420">')

    # Place it to the default image. The one that triggers the modal.
    $('#campaign_image').attr('src', img)

    # Place the datafile value in the hidden field
    $('#image_datafile').val(img)

  $('.btnZoomIn').on 'click', ->
    cropper.zoomIn()

  $('.btnZoomOut').on 'click', ->
    cropper.zoomOut()
  ##- END CROPBOX ##


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