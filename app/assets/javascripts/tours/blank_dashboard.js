// How is this conditionally displayed (if dashboard is blank or not)
// for testing purposes? 
// Need to ensure that position of walkthrough-boxes here are correct, 
// adjust as needed using plugin options `arrowOffset` and `xOffset`, 
// see business-edit.js (same directory) for an example


(function($) {
  
  var tour = {
    id: 'tour-blank-dashboard',
    steps: [
      {
        title: 'Welcome to Zippy Spot!',
        content: 'Youre on your way to interacting with your customers and becoming a better business because of it. Let us show you around!',
        target: '#welcome-heading',
        placement: 'left'
      }, {
        title: 'Account and Help',
        content: 'Your account dropdown give you the option to view help docs, edit your account, or log out from Zippy Spot.',
        target: '#your-account',
        placement: 'bottom',
        arrowOffset: 252,
        xOffset: -210
      }, {
        title: 'Sidebar',
        content: 'Your sidebar is always here and allows you to navigate the Zippy Spot platform. You can collapse or expand the sidebar by clicking this icon.',
        target: '#navTrigger',
        placement: 'right'
      }, {
        title: 'Getting Started',
        content: 'This green menu shows you a list of tasks that need to be completed prior to publishing your business.',
        target: '#progress_finger',
        placement: 'left'
      }, {
        content: 'Let\'s make sure your business profile is up-to-date! Click to begin.',
        target: '.profile-progress-list li:first a',
        placement: 'bottom',
        showNextButton: false,
        showCTAButton: true,
        ctaLabel: "Setup Business Profile",
        onCTA: function() {
          window.location = $('.profile-progress-list li:first a').attr('href');
        }
      }
    ]
  };

  // Start the tour!

  $('body').addClass('sb-is-open');
  
  return setTimeout((function() {
    hopscotch.startTour(tour);
  }), 400);

})(jQuery);