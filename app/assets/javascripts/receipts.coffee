(($) ->

	# Remotely load the receipt-show page
	$('#viewReceiptModal').on 'show.bs.modal', (event)->
	  button = $(event.relatedTarget) # Button that triggered the modal
	  url = button.href # Extract info from data-* attributes

	  modal = $(this)

	  $.get url, (data)->
		  modal.find('.modal-content').html data
	
) jQuery