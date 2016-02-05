// These steps are initiated inside of shared/init_tour.js
var tour_steps = [
  {
    title: 'Active Campaigns',
    content: 'The top campaigns that are active and are set to be available today are shown here.',
    target: '.page-top_left h2',
    placement: 'top',
  }, {
    title: 'View Other Campaigns',
    content: 'When there are more active campaigns than being shown, click this button to view your list of campaigns.',
    target: '#tour-view-campaign',
    placement: 'top',
    arrowOffset: 252,
    xOffset: -96
  }, {
    title: 'Business Stats',
    content: 'These charts and numbers give you and overview to the activity of the customers and campaigns in your store.',
    target: '#tour-activity',
    placement: 'right'
  }
];

if ( $('#tour-trial').length )
{
  tour_steps.push({
    title: 'Your Trial',
    content: 'This shows you how many days you have remaining in your trial. Once this hits 0, you will be billed according to the subscription you selected.',
    target: '#tour-trial',
    placement: 'bottom',
    arrowOffset: 252,
    xOffset: -210
  });
}