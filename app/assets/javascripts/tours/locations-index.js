// These steps are initiated inside of shared/init_tour.js

// No pending locations exist
if ( !$('#tour-pending').length )
{
	var tour_steps = [
	  {
	    title: 'Create your First Location',
	    content: 'A "location" is your physical storefront, and you can have many of them. Each location is linked to a beacon, which allows the mobile app to communicate with your platform. Get started by creating your first location!',
	    target: '#tour-new-location',
	    placement: 'left',
	    showNextButton: false
	  }
	];
}

// Pending locations DO exist
else
{
	var tour_steps = [
	  {
	    title: 'Pending Locations',
	    content: 'These are locations that are not currently active.',
	    target: '#tour-pending',
	    placement: 'left'
	  }, {
	    title: 'Beacon Status',
	    content: 'If you have not placed an order yet, or you are simply awaiting the beacon to come in the mail, you can view its status here.',
	    target: '#tour-pending-status',
	    placement: 'top'
	  }, {
	    title: 'Options',
	    content: 'If you have not placed the order, you can continue to the subscription page. Otherwise, once you receive the beacon in the mail, you can look here to confirm and activate your beacon and location.',
	    target: '#tour-pending-options',
	    placement: 'top'
	  }
	];
}