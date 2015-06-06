require 'rails_helper'

RSpec.describe "Receipts", type: :request do
  describe "GET /receipts" do
    it "works! (now write some real specs)" do
      get receipts_path
      expect(response).to have_http_status(200)
    end
  end
end
