require 'rails_helper'

RSpec.describe Api::V1::ReceiptsController, type: :controller do
  before(:each) { controller.stub(:api_key_valid?).and_return(true) }

  # POST /
  describe 'POST #create' do
    before :each do
      @business = FactoryGirl.create(:business_with_locations)
      @customer = FactoryGirl.create(:facebook_customer)
      @location = @business.locations.first
      @campaign = FactoryGirl.create(:campaign, locations: [@location])
      controller.stub(:current_customer).and_return(@customer)
      FactoryGirl.create(:membership, business: @business, customer: @customer)
    end
    
    context '[No redemption is associated]' do
      context '[Valid image file]' do
        before :each do
          file = fixture_file_upload('files/receipt.jpg', 'image/jpeg')
          post :create, version: 1, receipt: {location_id: @location.id, image: file}
        end

        it 'creates the redemption without a campaign' do
          expect(Receipt.last.redemption.location).to eq(@location)
        end

        it 'uploads the file and returns success' do
          expect(Receipt.last.image_file_name).not_to be_nil
          expect(response.status).to eq 200
        end
      end
    end

    context '[Has an associated redemption]' do
      before :each do
        @redemption = FactoryGirl.create(:redemption, campaign: @campaign, customer: @customer, location: @location)
      end

      context '[Customer token exists]' do
        context '[Valid image file]' do
          before :each do
            file = fixture_file_upload('files/receipt.jpg', 'image/jpeg')
            post :create, version: 1, receipt: {location_id: @location.id, image: file, redemption_id: @redemption.id}
          end

          it 'uploads the file and returns 200 OK' do
            expect(Receipt.last.image_file_name).not_to be_nil
            expect(response.status).to eq 200
          end
        end

        context '[Fake image file]' do
          before :each do
            file = fixture_file_upload('files/fake.jpg', 'image/jpeg')
            post :create, version: 1, receipt: {location_id: @location.id, image: file, redemption_id: @redemption.id}
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
            post :create, version: 1, receipt: {location_id: @location.id, image: file, redemption_id: @redemption.id}
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


  # GET /:status
  describe 'GET #index' do
    context '[Receipts exist]' do
      before :each do
        business = FactoryGirl.create(:business_with_locations)
        @location = business.locations.first
        campaign = FactoryGirl.create(:campaign, locations: [@location])

        customer = FactoryGirl.create(:facebook_customer)
        controller.stub(:current_customer).and_return(customer)

        redemption = FactoryGirl.create(:redemption, customer: customer, location: @location, campaign: campaign)

        FactoryGirl.create(:receipt, redemption: redemption)
        FactoryGirl.create(:receipt_approved, redemption: redemption)
        FactoryGirl.create(:receipt_rejected, redemption: redemption)
      end

      it 'returns the untouched receipts' do
        get :index, version: 1
        expect(response).to be_collection_resource
        expect(JSON.parse(response.body)["count"]).to eq 1
      end
      
      it 'returns the approved receipts' do
        get :index, version: 1, status: 'approved'
        expect(response).to be_collection_resource
        expect(JSON.parse(response.body)["count"]).to eq 1
      end

      it 'returns the rejected receipts' do
        get :index, version: 1, status: 'rejected'
        expect(response).to be_collection_resource
        expect(JSON.parse(response.body)["count"]).to eq 1
      end

      it 'returns ALL receipts' do
        get :index, version: 1, status: 'all'
        expect(response).to be_collection_resource
        expect(JSON.parse(response.body)["count"]).to eq 3
        byebug
      end
    end
  end

end