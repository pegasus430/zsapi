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
    ]

  # Start the tour!
  setTimeout (->
    hopscotch.startTour tour
    return
  ), 300

) jQuery