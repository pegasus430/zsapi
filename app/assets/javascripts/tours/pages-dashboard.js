// These steps are initiated inside of shared/init_tour.js
var tour_steps = [
  {
    title: 'Active Campaigns',
    content: 'The top campaigns that are active and are set to be available today are shown here.',
    target: '.page-top_left h2',
    placement: 'left',
  }, {
    title: 'Sidebar',
    content: 'Your sidebar is always here and allows you to navigate the Zippy Spot app. You can collapse or expand the sidebar by clicking this icon.',
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
      return $('.profile-progress-list li:first a').trigger('click');
    }
  }
];