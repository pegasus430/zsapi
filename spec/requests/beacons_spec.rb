require 'rails_helper'

RSpec.describe "Beacons", type: :request do
  describe "GET /beacons" do
    it "works! (now write some real specs)" do
      get beacons_path
      expect(response).to have_http_status(200)
    end
  end
end
