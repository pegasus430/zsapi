#= require cropbox
#= require shared/files

(($) ->
  ## START CROPBOX
  cropbox_options =
    thumbBox: '.thumbBox',
    spinner:  '.spinner',
    imgSrc:   $("#saved_image").attr 'src'

  
  $(".file_field").on 'change', ->
    reader = new FileReader
    reader.onload = (e) ->
      cropbox_options.imgSrc = e.target.result
      window.cropper = $('#avatarBox').cropbox(cropbox_options)
      $('#btnCrop, #btnZoomIn, #btnZoomOut').removeClass('disabled')
    reader.readAsDataURL(this.files[0])
    this.files = []


  # Crop handler.
  $('.btnCrop').on 'click', ->
    img = window.cropper.getDataURL()

    # Place the cropped image's datafile.
    $('.cropped_image').html('<img src="'+img+'" width="420">')


  # Crop handler.
  $('#btnSaveClose').on 'click', ->
    img = window.cropper.getDataURL()

    # Place the cropped image's datafile.
    $('.cropped_image').html('<img src="'+img+'" width="420">')

    # Place it to the default image. The one that triggers the modal.
    $('#saved_image').attr('src', img)

    # Place the datafile value in the hidden field
    $('#image_datafile').val(img)

    if $('#refreshDetectedColors').is('*')
      $('#refreshDetectedColors').trigger 'click'


  $('.btnZoomIn').on 'click', ->
    cropper.zoomIn()


  $('.btnZoomOut').on 'click', ->
    cropper.zoomOut()
  ##- END CROPBOX ##

) jQuery