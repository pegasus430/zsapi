/* ---------------------------------------

Applications.js

Notes: 
- see assets.rb (/config/initializers/assets.rb) for list of 
  individual bundles (config in config/browserify.yml)
*/



// Assets
//= require jquery
//= require jquery_ujs
//= require jquery.mobile.custom

// Gem
//= require twitter/bootstrap

// Vendor
//= require select/jquery.selectBox
//= require bootstrap-table
//= require hopscotch/hopscotch

//= require turbolinks
//= require_self




var globalInitializers = require('./global/global.inits')
globalInitializers()

var globalModals = require('./global/global.modals')
globalModals()




// REMOVED 
// dateSorter function
// commit reference:
// 3d07e7813eb5f33f8242130d990d20aef7384cc5