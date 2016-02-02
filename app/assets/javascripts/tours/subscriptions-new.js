(function($) {

  var tour = {
    id: 'tour-locations-new',
    steps: [
      {
        title: 'Choose a Payment Plan',
        content: 'The location you created is currently in a "pending" state. You will active it once you receive your new beacon in the mail. Choose the subscription plan for you to get started!',
        target: '#tour-plans',
        placement: 'left'
      }, {
        title: 'Placing the Order',
        content: 'After you fill in the billing details and have read the Terms and Condition. Click the button to place your beacon order.',
        target: '#tour-button',
        placement: 'top'
      }
    ]
  };

  // Start the tour!

  return setTimeout((function() {
    hopscotch.startTour(tour);
  }), 400);
})(jQuery);