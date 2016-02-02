(function($) {

  var tour = {
    id: 'tour-businesses-edit',
    steps: [
      {
        title: 'Start by Uploading you Logo',
        content: 'Click the image placeholder and upload your business logo. You can crop it to ensure it is proportioned correctly.',
        target: '#logo-row label',
        placement: 'left'
      }
    ]
  };

  // Start the tour!

  return setTimeout((function() {
    hopscotch.startTour(tour);
  }), 400);
})(jQuery);