
$( document ).ready(function(){


    /* STARTING TOUR */

    var tour = {
      id: "sidebar-tour",
      steps: [
        {
          title: "Title",
          content: "This is the header of my page.",
          target: "#couponTitle",
          placement: "bottom",
          nextOnTargetCustom: "keypress" ,//this is a custom event I created to support any DOM event
          nextOnTargetCustomEnabled: true,// this is to enable custom event
          showNextButton: false
        },
        {
          title: "Location",
          content: "Here is where I put my content.",
          target: "#validLocation",
          placement: "bottom",
          nextOnTargetClick: true,
          showNextButton: false
        },
        {
          title: "Campaign Image",
          content: "This is the header of my page.",
          target: "#campaignImage",
          placement: "bottom",
          nextOnTargetClick: true,
          showNextButton: false
        },
        {
          title: "Crop Image",
          content: "This is the header of my page.",
          target: "#cropImage",
          placement: "bottom",
          nextOnTargetClick: true,
          showNextButton: false
        },
        {
          title: "Crop it!",
          content: "This is the header of my page.",
          target: ".crop-btn",
          placement: "bottom",
          nextOnTargetClick: true,
          showNextButton: false,
          fixedElement: true
        },
        
        {
          title: "Start Date",
          content: "This is the header of my page.",
          target: "#campaignStart",
          //xOffset: 60,
          yOffset: -10,
          placement: "right",
          nextOnTargetClick: true,
          showNextButton: false
        },
        {
          title: "When expires",
          content: "This is the header of my page.",
          target: "#campaignExpires",
          placement: "right",
          nextOnTargetClick: true,
          showNextButton: false
        },
        {
          title: "Days of week",
          content: "This is the header of my page.",
          target: "#campaignDaysOfWeek",
          placement: "bottom",
          nextOnTargetClick: true,
          showNextButton: false
        },
        {
          title: "Valid Weeks",
          content: "This is the header of my page.",
          target: "#campaignValidWeeks",
          placement: "bottom",
          nextOnTargetClick: true,
          showNextButton: false
        },
        {
          title: "Valid days",
          content: "This is the header of my page.",
          target: "#campaignValidDays",
          placement: "right",
          nextOnTargetClick: true,
          showNextButton: false
        },
        {
          title: "Days of the month",
          content: "This is the header of my page.",
          target: "#daysOfTheMonth",
          placement: "right",
          nextOnTargetClick: true,
          showNextButton: false
        },
        {
          title: "Time between",
          content: "This is the header of my page.",
          target: "#campaignTimeBetween",
          placement: "right",
          nextOnTargetClick: true,
          showNextButton: false
        },
        {
          title: "Syndication",
          content: "This is the header of my page.",
          target: "#campaignSyndication",
          placement: "bottom",
          nextOnTargetClick: true,
          showNextButton: false
        },
        {
          title: "All done",
          content: "This is the header of my page.",
          target: ".campaign-image button",
          placement: "top"
        }
      ]
    };
    
    // Start the tour!
    hopscotch.startTour(tour);
});