require 'rails_helper'

RSpec.describe "OmniAuth Callbacks", type: :request do
  
  OmniAuth.config.test_mode = true

  def login(strategy, mock_data)
      OmniAuth.config.add_mock(strategy.to_sym)
      get "/users/auth/#{strategy.to_s}"
      request.env['omniauth.env'] = OmniAuth.config.mock_auth[strategy.to_sym]
      get "/users/auth/#{strategy.to_s}/callback"
  end

  describe "Login" do
  	# Login before each test
  	before :each do
  		@user = FactoryGirl.create(:user)
  	  login_as @user, scope: :user
  	end

    it "logs into twitter" do
  	  login('twitter', {uid: 1234, :credentials => {token: 1234444} })
  	  byebug
      expect(response).to have_http_status(200)
    end
	end

end