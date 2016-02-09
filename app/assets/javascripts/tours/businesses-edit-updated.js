// These steps are initiated inside of shared/init_tour.js
var tour_steps = [
  {
    title: 'Great job!',
    content: 'Now let\'s create your first location so we can get your beacon ready.',
    target: 'i.fa.fa-star',
    placement: 'left',
    showNextButton: false,
    showCTAButton: true,
    ctaLabel: "Setup a Store Location",
    onCTA: function() {
      window.location = $('.profile-progress-list li:last a').attr('href');
    }
  }
];