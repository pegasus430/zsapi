//= require shared/datepicker

//= require s-receipts



// Remotely load the receipt-show page

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


//= require shared/dateSorter
