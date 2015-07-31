
$( document ).ready(function(){

/* STARTING TOUR */

    var tour = {
      id: "menu-tour",
      steps: [
        {
          title: "Dashboard",
          content: "This is the header of my page.",
          target: "#dashboard",
          placement: "right"
        },
        {
          title: "Business Profile",
          content: "Here is where I put my content.",
          target: "#business",
          placement: "right"
        },
        {
          title: "Greetings",
          content: "Here is where I put my content.",
          target: "#greetings",
          placement: "right"
        },
        {
          title: "Campaigns",
          content: "Here is where I put my content.",
          target: "#campaigns",
          placement: "right"
        },
        {
          title: "Customers",
          content: "Here is where I put my content.",
          target: "#customers",
          placement: "right"
        },
        {
          title: "Receipts",
          content: "Here is where I put my content.",
          target: "#receipts",
          placement: "right"
        },
        {
          title: "Locations",
          content: "Here is where I put my content.",
          target: "#locations",
          placement: "right"
        }
      ]
    };

    // Start the tour!
    hopscotch.startTour(tour);
});