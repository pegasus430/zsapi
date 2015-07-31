
$( document ).ready(function(){

/* STARTING TOUR */

    var tour = {
      id: "menu-tour",
      steps: [
        {
          title: "Essential Info Title",
          content: "This is the header of my page.",
          target: ".essentialInfoTitle",
          placement: "left",
          width: 150,
          yOffset: 30
        },
        {
          title: "Style Options Title",
          content: "Here is where I put my content.",
          target: ".styleOptionsTitle",
          placement: "top"
        },
        {
          title: "Social Settings Title",
          content: "Here is where I put my content.",
          target: ".socialSettingsTitle",
          placement: "bottom"
        },
        {
          title: "Integrations Title",
          content: "Here is where I put my content.",
          target: ".integrationsTitle",
          placement: "right",
          xOffset: -700,
          yOffset: 30
        }
      ]
    };
    
    hopscotch.startTour(tour);
    
});