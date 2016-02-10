// These steps are initiated inside of shared/init_tour.js
var tour_steps = [
  {
    title: 'Campaigns',
    content: 'A campaign is what you are wanting to show your customers. It can be a coupon, a reward, or a special.',
    target: '.page-top_utils',
    placement: 'top'
  }, {
    title: 'Filters',
    content: 'You don\'t have any campaigns to view currently, but when you do, these filters allow you to find just what you\'re looking for.',
    target: '#tour-filter',
    placement: 'top'
  }, {
    title: 'Location Views',
    content: 'If you have more than one location and want to view campaigns for that location only, you can do so by choosing the location from this dropdown menu.',
    target: '#tour-location-menu',
    placement: 'bottom',
    arrowOffset: 252,
    xOffset: -210
  }, {
    title: 'Get Started',
    content: 'Let\s go ahead and create your first campaign. Click on "New Campaign" to continue.',
    target: '#tour-new-campaign',
    placement: 'top',
    nextOnTargetClick: '#tour-new-campaign',
    showNextButton: false
  }, {
  	delay: 400,
    title: 'Coupons',
    content: 'Coupons are campaigns such as "10% off drinks" or "$5 off new pies". They allow you to discount an item by a percentage or dollar amount.',
    target: '#tour-coupon',
    placement: 'top'
  }, {
    title: 'Rewards',
    content: 'Rewards are similar to coupons, but they can only be purchase with reward points that are earned by the customer.',
    target: '#tour-reward',
    placement: 'top'
  }, {
    title: 'Specials',
    content: 'Specials allow you to advertise in-store deals that do not necessarily require the use of a coupon or reward redemption. For example, "Half-off all drinks on Tuesday".',
    target: '#tour-special',
    placement: 'top'
  }, {
    title: 'Create a Campaign',
    content: 'Choose either a Coupon, Reward, or Special to continue.',
    target: '#tour-modal',
    placement: 'bottom'
  }
];