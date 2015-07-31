
$( document ).ready(function(){

/* STARTING TOUR */

    var tour = {
      id: "menu-tour",
      steps: [
        {
          title: "Dashboard",
          content: "This is the header of my page.",
          target: "#dashboard",
          placement: "right",
          fixedElement:true
        },
        {
          title: "Business Profile",
          content: "Here is where I put my content.",
          target: "#business",
          placement: "right",
          fixedElement:true
        },
        {
          title: "Greetings",
          content: "Here is where I put my content.",
          target: "#greetings",
          placement: "right",
          fixedElement:true
        },
        {
          title: "Campaigns",
          content: "Here is where I put my content.",
          target: "#campaigns",
          placement: "right",
          fixedElement:true
        },
        {
          title: "Customers",
          content: "Here is where I put my content.",
          target: "#customers",
          placement: "right",
          fixedElement:true
        },
        {
          title: "Receipts",
          content: "Here is where I put my content.",
          target: "#receipts",
          placement: "right",
          fixedElement:true
        },
        {
          title: "Locations",
          content: "Here is where I put my content.",
          target: "#locations",
          placement: "right",
          fixedElement:true
        }
      ]
    };
    $('.ui-overlay-a').addClass("active");
    $('.db-header').addClass("active");
    $('.header').addClass("active");
    $('#home').addClass("active");
    // Start the tour!
    setTimeout(function () {
        hopscotch.startTour(tour);
    }, 300);
    
});