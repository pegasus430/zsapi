# After an image is selected, update the text span to show the filename
displayUploadedFilename = (fileInput) ->
  file = fileInput.files[0]
  $(fileInput).next('span').text file.name
  return



(($) ->

	# Handle the browse button click
	# and trigger the function above
	if $('.file-upload').length
    $('.upload-trigger').click ->
      $(this).next('input[type="file"]').trigger 'click'
      return false

		$('.file_field').change ->
			displayUploadedFilename this
			return
		return

) jQuery