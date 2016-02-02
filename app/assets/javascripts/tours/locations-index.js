(function($) {

  var tour = {
    id: 'tour-locations-index',
    steps: [
      {
        title: 'Create your First Location',
        content: 'A "location" is your physical storefront, and you can have many of them. Each location is linked to a beacon, which allows the mobile app to communicate with your platform. Get started by creating your first location!',
        target: '#tour-new-location',
        placement: 'left',
        showNextButton: false
      }
    ]
  };

  // Start the tour!

  return setTimeout((function() {
    hopscotch.startTour(tour);
  }), 400);
})(jQuery);