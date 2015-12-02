/* ---------------------------------------

Applications.js

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

var sidebarInit = require('./global/global.sidebar')
sidebarInit()

var globalModals = require('./global/global.modals')
globalModals()