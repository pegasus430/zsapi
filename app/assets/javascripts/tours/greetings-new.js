// These steps are initiated inside of shared/init_tour.js
var tour_steps = [
  {
    title: 'Entrance Greeting',
    content: 'When a customer enters your store location, they will receive this welcome message. Optionally, you can offer them bonus rewards per day, week, or month.',
    target: '#tour-welcome',
    placement: 'top'
  }, {
    title: 'Exit Greeting',
    content: 'When a customer exits your store location, they will see what you write here.',
    target: '#tour-exit',
    placement: 'top',
    onNext: function(){
      $('#attach').click();
    }
  }, {
    title: 'Campaigns',
    content: 'If you would like to mention a campaign that is available when they return, you can attach it to the exit greeting here.',
    target: '#attach',
    placement: 'top'
  }, {
    title: 'Finishing up',
    content: 'Click Submit to save your Greeting. Once saved, you can assign it to a specific location by editing that location and choosing this greeting.',
    target: '#tour-button',
    placement: 'top'
  }
];