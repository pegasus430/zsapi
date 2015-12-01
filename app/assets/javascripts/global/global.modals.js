


// TODO: consider refacoring this into css... 



module.exports = function() {
  "use strict";

  function centerModal() {


    $(this).css('display', 'block');


    var $dialog      = $(this).find(".modal-dialog")
    var offset       = ($(window).height() - $dialog.height()) / 2
    var bottomMargin = parseInt($dialog.css('marginBottom'), 10)


    // Make sure you don't hide the top part of the modal 
    // w/ a negative margin if it's longer than the screen 
    // height, and keep the margin equal to the bottom margin of the modal

    if ( offset < bottomMargin ) {

      $dialog.css("margin-top", bottomMargin)

    } 


    $(document).on('show.bs.modal', '.modal', centerModal)

    $(window).on("resize", function () {

      $('.modal:visible').each(centerModal)

    })

  }

}