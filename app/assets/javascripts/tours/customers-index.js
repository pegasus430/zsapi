// These steps are initiated inside of shared/init_tour.js
var tour_steps = [
  {
    title: 'Customers',
    content: 'Once a visitor of your store uses the Zippy Spot app, they will become "customers" in your Zippy Spot system.',
    target: '#tour-title',
    placement: 'left'
  }
];

if ( $('#tour-no-customers').length )
{
	tour_steps.push({
		title: 'No customers!',
		content: 'It looks like you do not currently have any customers. No worries! They will be auto-added as they use the Zippy Spot app in your store.',
		target: '#tour-no-customers',
		placement: 'left'
	});
}

tour_steps.push({
	title: 'Importing Customers',
	content: 'If you have a list of customers who have previously held a reward balance, you can import them via CSV.',
	target: '#tour-import',
	placement: 'left'
}, {
	title: 'CSV Import',
	content: 'Please ensure that your CSV file is properly formatted by following the instructions in our help docs.',
	target: '#tour-import-help',
	placement: 'top'
});