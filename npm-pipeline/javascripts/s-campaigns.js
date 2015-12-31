

/*
Toggleable Sections
*/

var toggleSections = require('./components/toggle-section');
toggleSections();




/*
Modal Gallery
*/

var modalGallery = require('./components/modal-gallery');
modalGallery();




// Listen for changes on the location filter dropdown
// and redirect the window appropriately

var locationFilter = require('./components/location-filter');
locationFilter();



// Limit the number of locations displayed by default in tables...
// add a simple show more / less 

var listOverflowMore = require('./components/list-overflow-more');
listOverflowMore();