

module.exports = function(percentCircle) {

  percentCircle.each(function() {
    var $this = $(this)

    // get the percentage, set via data attribute 
    var percentage = $this.data('percentage')
    var color = $this.css('background-color')


    // convert supplied value (percentage, 1-100) into degree (out of 360)
    var degree = calculateDegree(percentage)


    if (degree <= 180) {

      // both colors here are effectively mask colors

      $this.css('background-image', 'linear-gradient(' + (90+degree) + 'deg, transparent 50%, #DEDEDE 50%), linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')
      // $this.css('background-image', '-webkit-linear-gradient(' + (90+degree) + 'deg, transparent 50%, #DEDEDE 50%), -webkit-linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')

    } else {

      // the first color here needs to be set to the same as the 

      $this.css('background-image', 'linear-gradient(' + (degree-90) + 'deg, transparent 50%, '+color+' 50%), linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')
      // $this.css('background-image', '-webkit-linear-gradient(' + (degree-90) + 'deg, transparent 50%, #DEDEDE 50%), -webkit-linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')

    }

  })

}



var calculateDegree = function(percentage) {
  var degree = percentage * 3.6
  return degree
}