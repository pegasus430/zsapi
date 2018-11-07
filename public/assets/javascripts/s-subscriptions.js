(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function($) {
  
  var stripeResponseHandler = function(status, response) {
    var $form, token;
    $form = $('#stripe_form');
    if (response.error) {
      $form.find('.payment-errors').text(response.error.message);
      return $form.find('button').prop('disabled', false);
    } else {
      token = response.id;
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
      return $form.get(0).submit();
    }
  };
  
  return $('#stripe_form').submit(function(event) {

    // alert 'y'
    var $form;
    $form = $(this);
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from submitting with the default action
    return false;
  });

})(jQuery);
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvcy1zdWJzY3JpcHRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIoZnVuY3Rpb24oJCkge1xuICBcbiAgdmFyIHN0cmlwZVJlc3BvbnNlSGFuZGxlciA9IGZ1bmN0aW9uKHN0YXR1cywgcmVzcG9uc2UpIHtcbiAgICB2YXIgJGZvcm0sIHRva2VuO1xuICAgICRmb3JtID0gJCgnI3N0cmlwZV9mb3JtJyk7XG4gICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAkZm9ybS5maW5kKCcucGF5bWVudC1lcnJvcnMnKS50ZXh0KHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuICRmb3JtLmZpbmQoJ2J1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2tlbiA9IHJlc3BvbnNlLmlkO1xuICAgICAgJGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cInN0cmlwZVRva2VuXCIgLz4nKS52YWwodG9rZW4pKTtcbiAgICAgIHJldHVybiAkZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgfVxuICB9O1xuICBcbiAgcmV0dXJuICQoJyNzdHJpcGVfZm9ybScpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuXG4gICAgLy8gYWxlcnQgJ3knXG4gICAgdmFyICRmb3JtO1xuICAgICRmb3JtID0gJCh0aGlzKTtcbiAgICAkZm9ybS5maW5kKCdidXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgIFN0cmlwZS5jYXJkLmNyZWF0ZVRva2VuKCRmb3JtLCBzdHJpcGVSZXNwb25zZUhhbmRsZXIpO1xuXG4gICAgLy8gUHJldmVudCB0aGUgZm9ybSBmcm9tIHN1Ym1pdHRpbmcgd2l0aCB0aGUgZGVmYXVsdCBhY3Rpb25cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuXG59KShqUXVlcnkpOyJdfQ==
