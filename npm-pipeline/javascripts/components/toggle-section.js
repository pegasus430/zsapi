/*

Toggle Sections

Addordian-like functionality for page sections

Notes:
- transition on height is handled via css

*/





var toggleSections = $('.toggle-section')
var height
var sectionHeight
var sectionToShow
var currentID
var nextBtns = $('.toggle-section_btn-next')
var prevBtns = $('.toggle-section_btn-prev')


module.exports = function() {



  // Once images have loaded, set the toggle sections

  $(window).on("load", function() {
    
    // First, remove first and last btns

    removeFirstAndLastBtns() 

    toggle()
    

    // Set event listeners on the next/prev btns
    setButtons()

  })



} // end exports




var toggle = function() {


  toggleSections.each(function(i) {
      var section = $(this)


      // Height is set to 0 in css
      // by using the incredibly niffty scrollHeight, 
      // we can get the height anyways 
      // see: 
      // http://stackoverflow.com/questions/5003220/javascript-jquery-animate-to-auto-height#answer-24762848
      height = section.get(0).scrollHeight


      // Store height
      section.attr('data-height', height)


      // Prepare the section:
      // - add id with the section's index
      section.attr('data-toggle-target', 'toggle-'+i)


      // Prepare the heading:
      // add class (for proper styling)
      // (note: this could be done in advance in the dom, 
      // but I'm unsure if this is worth the effort...
      // as the current rails helper doesn't yet allow for this)
      section.prev().find('h2')
        .attr('id', 'toggle-'+i)
        .addClass('section-toggle')



      // Click Listener
      // Scoped to the document, making use of jQuery's convience-behavior 
      // which prevents the need for a closure (otherwise needed when 
      // attaching event handlers inside of a loop, as JS evaluates functions
      // at the time of execution)

      $(document).on('click', ('#toggle-'+i), function() {
        var $this = $(this)
        
        updateToggle($this)

      }) // end click handler  

    }) // end loop


  /*
  Set first to open
  */

  var fistSection = $('#toggle-0')
  updateToggle(fistSection)

      
}









var updateToggle = function(target) {


  // Close previously open section
  $('.toggle-section').attr('style', 'height: 0')
  $('.section-toggle').removeClass('open')


  /*
  Open clicked section
  */

  // Add open class to heading (which effectively changes 
  // the plus to a minus, via the css)

  target.addClass('open')


  // Grab the clicked heading's id

  currentID = target.attr('id')
  

  // cache the section to show,
  // selecting via the data-toggle-target, which is set to 
  // it's respective heading's id

  sectionToShow = $('[data-toggle-target="'+currentID+'"]')


  // grab the target section's height

  sectionHeight = sectionToShow.data('height') + 'px';


  // show it

  sectionToShow.attr('style', 'height: '+sectionHeight)


}





var setButtons = function() {

  nextBtns.each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault()

      updateToggle($('#toggle-'+(i+1)))

    })
  })

  prevBtns.each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault()

      updateToggle($('#toggle-'+(i-1)))

    })
  })

}



var removeFirstAndLastBtns = function() {
  prevBtns.first().addClass('hidden')
  nextBtns.last().addClass('hidden')
}