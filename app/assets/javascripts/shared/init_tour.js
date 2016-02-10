(function($) {

	// The function to disable the tour once a tour ends or is closed
	var disableUserTour = function(name){
	  $.post( "/users/endTour", {name: name});
	}

  var tour = {
    id: tour_name,
    onEnd: function(){ disableUserTour(tour_name) },
    onClose: function(){ disableUserTour(tour_name) },
    steps: tour_steps
  };

  // Start the tour!

  return setTimeout((function() {
    hopscotch.startTour(tour, 0);
  }), 400);
})(jQuery);