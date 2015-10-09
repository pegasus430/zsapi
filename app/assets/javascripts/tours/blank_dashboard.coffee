(($) ->

  tour = 
    id: 'menu-tour'
    steps: [
      {
        title: 'Account and Help'
        content: 'Clicking your email address will give you the option to view help docs, edit your account, or log out from ZippySpot.'
        target: '#your-account'
        placement: 'bottom'
        fixedElement: true
      }
      {
        title: 'Dashboard'
        content: 'This is where you are now. Once you get your locations and campaigns setup, this page will give you an overview of your business for the day.'
        target: '#dashboard'
        placement: 'right'
        fixedElement: true
      }
      {
        title: 'Your Business Profile'
        content: 'Here is where you\'ll setup your business information such as your logo, colors, and social connections.'
        target: '#business'
        placement: 'right'
        fixedElement: true
      }
      {
        title: 'Greetings'
        content: 'Greetings are little messages that are shown to your customers when they enter or exit your store.'
        target: '#greeting'
        placement: 'right'
        fixedElement: true
      }
      {
        title: 'Campaigns'
        content: 'A campaign is what your customers redeem in-store. These can be coupons, rewards, or specials. Create and manage as many as you\'d like!'
        target: '#campaign'
        placement: 'right'
        fixedElement: true
      }
      {
        title: 'Customers'
        content: 'Here you can view the customers of your business, their contact information, and point totals. You can also import customers from a previous rewards system.'
        target: '#customer'
        placement: 'right'
        fixedElement: true
      }
      {
        title: 'Receipts'
        content: 'As receipts are approved by ZippySpot, they are shown here for your reference.'
        target: '#receipt'
        placement: 'right'
        fixedElement: true
      }
      {
        title: 'Locations'
        content: 'Your business should have at least 1 location, but can have as many as you\'d like. Each location is an individual store and beacon.'
        target: '#location'
        placement: 'right'
        fixedElement: true
      }
    ]

  # Start the tour!
  $('#start_tour').click ->
    $('.ui-overlay-a').addClass 'active'
    $('.db-header').addClass 'active'
    $('.header').addClass 'active'
    $('#home').addClass 'active'
    setTimeout (->
      hopscotch.startTour tour
      return
    ), 300

) jQuery