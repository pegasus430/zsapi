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