//= require jquery
//= require jquery_ujs
//= require jquery.mobile.custom
//= require twitter/bootstrap
//= require select/jquery.selectBox
// require masonry/masonry.pkgd
// require highcharts/highcharts
// require highcharts/exporting
//= require datepicker/bootstrap-datepicker
//= require bootstrap-table
//= require popup/jquery.magnific-popup.min
// require cropper/cropper
// require minicolors/jquery.minicolors
// require color-thief/color-thief
//= require hopscotch/hopscotch
//= require turbolinks
//= require_self



jQuery(document).ready(function($){
	/* CUSTOM DROP DOWN */
	$('select').selectBox({'mobile':true});



	// NAVBAR ACT
	$(".nav-trigger").click(function() {
	    $("#home").toggleClass("active");
	    $(".header").toggleClass("active");
	    $(".db-header").toggleClass("active");
	});



	/* SWIPE TO OPEN MENU */
	if ( $(!".minicolors").length > 0 )
	{
		$('body').on("swipeleft",function(){
		  $('.ui-overlay-a').removeClass("active");
		  $('.db-header').removeClass("active");
		  $('.header').removeClass("active");
		  $('#home').removeClass("active");
		});
		$('body').on("swiperight",function(){
		  $('.ui-overlay-a').addClass("active");
		  $('.db-header').addClass("active");
		  $('.header').addClass("active");
		  $('#home').addClass("active");
		});
	}


	// BATTERY
	$(".battery-status").click(function(event) {
	  $(".battery-ui").toggleClass("active");
	  $(".ico").toggleClass("active");
	  $(".profile-ui").removeClass("active");
	  $(".profile-pic").removeClass("active");
	  event.stopPropagation();
	});

	$('html').click(function() {
	  $(".battery-ui").removeClass("active");
	  $(".ico").removeClass("active");
	});

	$(".battery-ui").mouseleave(function(){
	  setTimeout(
	    function() 
	    {
	    $(".battery-ui").removeClass("active");
	    }, 3000);
	});



	//open Popup
	if ($('.open-popup-link').length) {
	    $('.open-popup-link').magnificPopup({
	      type:'inline',
	      midClick: true,
	      removalDelay: 500,
	      mainClass: 'mfp-fade'
	    });
	};

	  $('[data-toggle="tooltip"]').tooltip()


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