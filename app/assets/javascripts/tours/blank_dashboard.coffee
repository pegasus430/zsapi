(($) ->

  tour = 
    id: 'menu-tour'
    steps: [
      {
        title: 'Account and Help'
        content: 'Clicking your email address will give you the option to view help docs, edit your account, or log out from ZippySpot.'
        target: '#your-account'
        placement: 'bottom'
      }
      {
        title: 'Sidebar'
        content: 'Your sidebar is always here and allows you to navigate the Zippy Spot app. You can collapse or expand the sidebar by clicking this icon.'
        target: '.nav-trigger'
        placement: 'right'
      }
      {
        title: 'Getting Started'
        content: 'This green menu shows you a list of tasks that need to be completed prior to publishing your business.'
        target: '#progress_finger'
        placement: 'left'
      }
      {
        content: 'Let\'s make sure your business profile is up-to-date! Click to begin.'
        target: '.profile-progress-list li:first a'
        placement: 'bottom'
        showNextButton: false
        showCTAButton: true
        ctaLabel: "Setup Business Profile"
        onCTA: ->
          $('.profile-progress-list li:first a').trigger 'click'
      }
    ]

  # Start the tour!
  $('body').addClass 'active-sidebar'
  setTimeout (->
    hopscotch.startTour tour
    return
  ), 300

) jQuery