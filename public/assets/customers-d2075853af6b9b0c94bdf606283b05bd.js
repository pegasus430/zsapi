






// After an image is selected, update the text span to show the filename

var displayUploadedFilename = function(fileInput) { 
  var file = fileInput.files[0];
  $(fileInput).next('span').text(file.name);
};






// Handle the browse button click
// and trigger the function above

(function($) {

  if ($('.file-upload').length) {
    $('.upload-trigger').click(function() {
      $(this).next('input[type="file"]').trigger('click');
      return false;
    });
  }

  $('.file_field').change(function() {
    displayUploadedFilename(this);
  });
  
})(jQuery);
