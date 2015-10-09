// Assets
//= require jquery
//= require jquery_ujs
//= require jquery.mobile.custom

// Gem
//= require twitter/bootstrap

// Vendor
//= require select/jquery.selectBox
// Bootstrap datepicker
//= require datepicker/bootstrap-datepicker
//= require bootstrap-table
//= require hopscotch/hopscotch

//= require turbolinks
//= require_self



jQuery(document).ready(function($){
	// Init selectBox
	$('select').selectBox({'mobile':true});

	// Navbar Collapsing
	$(".nav-trigger").click(function() {
	    $("body").toggleClass("active_sidebar");
	});

	// Swipe to open menu
	if ( $(!".minicolors").length > 0 )
	{
		$('body').on("swipeleft",function(){
		  $(this).removeClass("active_sidebar");
		});
		$('body').on("swiperight",function(){
		  $(this).addClass("active_sidebar");
		});
	}

	// Tooltip menus
  $('[data-toggle="tooltip"]').tooltip({html: true})
});



function dateSorter(a, b) {
  var auxA =Array();
  var auxB =Array();
  auxA = a.split('/'); 
  auxB = b.split('/');
  if(parseInt(auxA[0]) == parseInt(auxB[0]) && parseInt(auxA[1]) == parseInt(auxB[1]) && parseInt(auxA[2]) == parseInt(auxB[2]) ){
    return 0;
  }
  if(parseInt(auxA[2]) != parseInt(auxB[2])){ 
    if( parseInt(auxA[2]) > parseInt(auxB[2]) ){
      return 1; 
    }else{
      return -1; 
    }
  }else{
    if(parseInt(auxA[0]) != parseInt(auxB[0]) ){ 
      if( parseInt(auxA[0]) > parseInt(auxB[0]) ){
        return 1; 
      }else{
        return -1; 
      }
    }else{
      if ( parseInt(auxA[1]) > parseInt(auxB[1]) ) {
        return 1; 
      }else{
        return -1;
      }
    }
    
  }
  
}



(function ($) {
    "use strict";
    function centerModal() {
        $(this).css('display', 'block');
        var $dialog  = $(this).find(".modal-dialog"),
        offset       = ($(window).height() - $dialog.height()) / 2,
        bottomMargin = parseInt($dialog.css('marginBottom'), 10);

        // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
        if(offset < bottomMargin) offset = bottomMargin;
        $dialog.css("margin-top", offset);
    }

    $(document).on('show.bs.modal', '.modal', centerModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(centerModal);
    });
}(jQuery));