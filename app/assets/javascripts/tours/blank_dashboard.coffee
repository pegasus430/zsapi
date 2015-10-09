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
        title: 'Dashboard'
        content: 'This is where you are now. Once you get your locations and campaigns setup, this page will give you an overview of your business for the day.'
        target: '#dashboard'
        placement: 'right'
      }
      {
        title: 'Your Business Profile'
        content: 'Here is where you\'ll setup your business information such as your logo, colors, and social connections.'
        target: '#business'
        placement: 'right'
      }
      {
        title: 'Greetings'
        content: 'Greetings are little messages that are shown to your customers when they enter or exit your store.'
        target: '#greeting'
        placement: 'right'
      }
      {
        title: 'Campaigns'
        content: 'A campaign is what your customers redeem in-store. These can be coupons, rewards, or specials. Create and manage as many as you\'d like!'
        target: '#campaign'
        placement: 'right'
      }
      {
        title: 'Customers'
        content: 'Here you can view the customers of your business, their contact information, and point totals. You can also import customers from a previous rewards system.'
        target: '#customer'
        placement: 'right'
      }
      {
        title: 'Receipts'
        content: 'As receipts are approved by ZippySpot, they are shown here for your reference.'
        target: '#receipt'
        placement: 'right'
      }
      {
        title: 'Locations'
        content: 'Your business should have at least 1 location, but can have as many as you\'d like. Each location is an individual store and beacon.'
        target: '#location'
        placement: 'right'
      }
    ]

  # Start the tour!
  $('#start_tour').click ->
    $('body').addClass 'active_sidebar'
    setTimeout (->
      hopscotch.startTour tour
      return
    ), 300

) jQuery