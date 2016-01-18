(function($) {

  var tour = {
    id: 'menu-tour',
    steps: [
      {
        title: 'Account and Help',
        content: 'Clicking your email address will give you the option to view help docs, edit your account, or log out from ZippySpot.',
        target: '#your-account',
        placement: 'bottom',
        arrowOffset: 252,
        xOffset: -210
      }
    ]
  };

  // Start the tour!

  return setTimeout((function() {
    hopscotch.startTour(tour);
  }), 300);
})(jQuery);