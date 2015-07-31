// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
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


	// PROFILE
	$(".profile").click(function(event) {
	    $(".profile-ui").toggleClass("active");
	    $(".profile-pic").toggleClass("active");
	    $(".battery-ui").removeClass("active");
	    $(".ico").removeClass("active");
	     event.stopPropagation();
	});

	$('html').click(function() {
	    $(".profile-ui").removeClass("active");
	    $(".profile-pic").removeClass("active");
	});


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
});