/* -------------------------------------------
logo Changes
*/

var mostRecentLogo = $('#saved_image_1')

var previewImage_asImage = $('#preview-image-as-image')
var previewImage_asBg = $('#preview-image-as-bg')


var mostRecentLogoSrc
var handleLogo = function() {
  
  // Get src
  mostRecentLogoSrc = mostRecentLogo[0].currentSrc

  // Update: 

  // - core logo
  previewImage_asImage.attr('src', mostRecentLogoSrc)
  // - background image
  previewImage_asBg.css('background-image', mostRecentLogoSrc)
}




/* -------------------------------------------
Primary and Seconday Color Changs
*/


var mostRecentPrimary
var mostRecentSecondary
var handleColors = function() {

  // Get primary
  var mostRecentPrimary = $('#colorPicker1').next().find('.minicolors-swatch-color').css('background-color')
  // Get secondary
  // secondary color isn't currently used in preview... commenting out for now
  // var mostRecentSecondary = $('#colorPicker2').next().find('.minicolors-swatch-color').css('background-color')


  // Update: 

  $('.previewPrimaryBg').each(function() {
    $(this).css('background-color', mostRecentPrimary)
  })

}







module.exports = function() {

  /* -------------------------------------------
  Listen for preview show
  */


  $("[data-target='#previewModal']").click(function() {

    handleLogo()

    handleColors()

  })


}