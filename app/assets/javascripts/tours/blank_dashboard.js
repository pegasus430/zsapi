// These steps are initiated inside of shared/init_tour.js
var tour_steps = [
  {
    title: 'Welcome to Zippy Spot!',
    content: 'You\'re on your way to interacting with your customers and becoming a better business because of it. Let us show you around!',
    target: '#welcome-heading',
    placement: 'top'
  }, {
    title: 'Account and Help',
    content: 'Your account dropdown gives you the option to view help docs, edit your account, or log out from Zippy Spot.',
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
];