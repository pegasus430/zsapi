(function($) {

  var tour = {
    id: 'tour-locations-new',
    steps: [
      {
        title: 'The specifics',
        content: 'Enter your storefront\'s physical address, along with a title (such as the street name).',
        target: '#tour-title',
        placement: 'left'
      }, {
        title: 'Photos',
        content: 'You can list up to 3 photos to show your customers in the mobile app when they are browsing for a place to visit.',
        target: '#tour-photos',
        placement: 'left'
      }, {
        title: 'Assign a Greeting',
        content: 'A greeting is a message that your customer will receive when they enter and exit your store. You can choose a greeting from the list, or create a new one. Click the (i) icons to get more information about each option.',
        target: '#tour-greetings',
        placement: 'left'
      }, {
        title: 'Finishing up',
        content: 'Once you have the form filled out, you are ready to initiate the beacon ordering process.',
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