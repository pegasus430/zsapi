// These steps are initiated inside of shared/init_tour.js
var tour_steps = [
  {
    title: 'Creating your Campaign',
    content: 'Go through this form and enter as much information as you can. If you are not sure of what something means, refer to the small (i) icon next to the field for an explanation.',
    target: '#tour-title',
    placement: 'left',
    onNext: function(){
      $('#toggle-3').click();
    }
  }, {
    delay: 400,
    title: 'Campaign Schedule',
    content: 'Schedules allow you to ensure your campaigns are only active when you want them to be active. The scheduling system is very flexible, so understanding how it works is key. Be sure to refer to the help icons, or the help docs, when creating complex schedules.',
    target: '#toggle-3',
    placement: 'left',
    onNext: function(){
      $('#toggle-0').click();
    }
  }, {
    delay: 400,
    title: 'Finishing up',
    content: 'Click Submit to save your Campaign and return to the Campaigns screen. If there are errors, we\'ll let you know!',
    target: '#tour-button',
    placement: 'top'
  }
];