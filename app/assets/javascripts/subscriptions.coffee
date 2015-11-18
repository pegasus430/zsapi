(($) ->

  stripeResponseHandler = (status, response) ->
    $form = $('#stripe_form')

    if response.error
      # Show the errors on the form
      $form.find('.payment-errors').text response.error.message
      $form.find('button').prop 'disabled', false
    else
      # response contains id and card, which contains additional card details
      token = response.id
      # Insert the token into the form so it gets submitted to the server
      $form.append($('<input type="hidden" name="stripeToken" />').val(token))
      # and submit
      $form.get(0).submit()


  $('#stripe_form').submit (event) ->
    # alert 'y'
    $form = $(this)
    $form.find('button').prop 'disabled', true

    Stripe.card.createToken $form, stripeResponseHandler

    # Prevent the form from submitting with the default action
    return false

) jQuery