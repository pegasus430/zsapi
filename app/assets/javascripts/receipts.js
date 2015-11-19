// (($) ->

// 	# Remotely load the receipt-show page
// 	$('#viewReceiptModal').on 'show.bs.modal', (event)->
// 	  button = $(event.relatedTarget) # Button that triggered the modal
// 	  url = button.href # Extract info from data-* attributes

// 	  modal = $(this)

// 	  $.get url, (data)->
// 		  modal.find('.modal-content').html data
	
// ) jQuery



(function($) {
  return $('#viewReceiptModal').on('show.bs.modal', function(event) {
    var button, modal, url;
    button = $(event.relatedTarget);
    url = button.href;
    modal = $(this);
    return $.get(url, function(data) {
      return modal.find('.modal-content').html(data);
    });
  });
})(jQuery);