require 'rails_helper'

RSpec.describe Api::V1::ReceiptsController, type: :controller do

  describe 'POST #create' do
    before :each do
      business = FactoryGirl.create(:business_with_locations)
      customer = FactoryGirl.create(:facebook_customer)
      FactoryGirl.create(:wallet, business: business, customer: customer)
      @location = business.locations.first
    end
    
    context '[Customer token exists]' do
      context '[Valid image file]' do
        before :each do
          file = fixture_file_upload('files/receipt.jpg', 'image/jpeg')
          post :create, version: 1, receipt: {location_id: @location.id, image: file}
        end

        it 'uploads the file' do
          expect(Receipt.last.image_file_name).not_to be_nil
        end
      
        it 'returns a sucess' do
          expect(response.status).to eq 200
        end
      end

      context '[Fake image file]' do
        before :each do
          file = fixture_file_upload('files/fake.jpg', 'image/jpeg')
          post :create, version: 1, receipt: {location_id: @location.id, image: file}
        end

        it 'does not upload file' do
          expect(Receipt.all.count).to eq 0
        end
      
        it 'returns a failure' do
          expect(response).to be_api_error
        end
      end

      context '[Not an image file]' do
        before :each do
          file = fixture_file_upload('files/notimage.txt', 'text/plain')
          post :create, version: 1, receipt: {location_id: @location.id, image: file}
        end

        it 'does not upload file' do
          expect(Receipt.all.count).to eq 0
        end
      
        it 'returns a failure' do
          expect(response).to be_api_error
        end
      end
    end
  end
end