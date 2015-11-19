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


var helpers = require('./shared/helpers');
helpers.echoText('hi from core applicatoins.js');



var globalInitializers = require('./globals/globals.inits')
globalInitializers()




// removed dateSorter function




(function ($) {
    "use strict";
    function centerModal() {
        $(this).css('display', 'block');
        var $dialog  = $(this).find(".modal-dialog"),
        offset       = ($(window).height() - $dialog.height()) / 2,
        bottomMargin = parseInt($dialog.css('marginBottom'), 10);

        // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
        if(offset < bottomMargin) offset = bottomMargin;
        $dialog.css("margin-top", offset);
    }

    $(document).on('show.bs.modal', '.modal', centerModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(centerModal);
    });
}(jQuery));