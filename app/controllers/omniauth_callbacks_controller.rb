class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    generic_callback( 'facebook' )
  end

  def twitter
    generic_callback( 'twitter' )
  end

  def mailchimp
    generic_callback( 'mailchimp' )
  end

  def constantcontact
    generic_callback( 'constantcontact' )
  end

  # We aren't creating a user, just simply adding the identity to the user
  def generic_callback( provider )
    @identity = Identity.find_for_oauth(env["omniauth.auth"])
    @identity.update_attribute(:user_id, current_user.id)

    if current_user.email.blank? && @identity.email
      current_user.update_attribute(:email, @identity.email)
    end

    session["devise.#{provider}_data"] = env["omniauth.auth"].except("extra")
    flash[:notice] = "#{provider} is now connected!"
    redirect_to edit_business_path
  end


  # This is fired when the user connects, or tries to re-connect,
  # so we can get additional permissions if needed.
  # Normally scopes are added in the devise.rb file with the provider setup,
  # however, doing that does not allow us to re-connect for additional
  # permissions if necessary. Now, we can use user_omniauth_upgrade_path( :provider )
  def upgrade
    scope = nil
    if params[:provider] == "facebook"
      scope = "email,manage_pages,publish_pages,publish_stream"
    end

    redirect_to user_omniauth_authorize_path( params[:provider] ), flash: { scope: scope }
  end


  # This is fired by default for each of the providers. It gives us basic read access
  def setup
    request.env['omniauth.strategy'].options['scope'] = flash[:scope] || request.env['omniauth.strategy'].options['scope']
    render :text => "Setup complete.", :status => 404
  end
end