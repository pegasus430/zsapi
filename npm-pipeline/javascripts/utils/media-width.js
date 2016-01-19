module.exports = function() {
  return window.getComputedStyle(
    document.querySelector('.width-indicator'), ':before'
  ).getPropertyValue('content')
} 
