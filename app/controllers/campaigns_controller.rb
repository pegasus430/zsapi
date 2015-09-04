class CampaignsController < ApplicationController
  before_action :set_campaign, only: [:show, :edit, :update, :destroy]
  before_action :load_image_gallery, only: [:new, :edit]

  def index
    @campaigns = current_user.business.campaigns
    @campaigns = @campaigns.send(params[:type]) unless params[:type] == 'all'
    @campaigns = @campaigns.send(params[:status]) unless params[:status] == 'all'
  end

  def show
  end

  def new
    @campaign = Campaign.new(type_of: params[:type])
  end

  def edit
  end

  def create
    @campaign = Campaign.new(campaign_params)


    respond_to do |format|
      if @campaign.save

        # Social
        social_message = "Posted a new campaign"

        if params[:twitter]
          if @campaign.image.path
            current_user.tweet_with_image( social_message, @campaign.image.path )
          else
            current_user.tweet( social_message )
          end
        end

        if params[:facebook]
          if @campaign.image.path
            current_user.post_to_facebook_page_with_image( social_message, @campaign.image.url )
          else
            current_user.post_to_facebook_page( social_message )
          end
        end
        # End social

        format.html { redirect_to @campaign, notice: 'Campaign was successfully created.' }
        format.json { render :show, status: :created, location: @campaign }
      else
        format.html { render :new }
        format.json { render json: @campaign.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @campaign.update(campaign_params)
        format.html { redirect_to @campaign, notice: 'Campaign was successfully updated.' }
        format.json { render :show, status: :ok, location: @campaign }
      else
        format.html { render :edit }
        format.json { render json: @campaign.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @campaign.destroy
    respond_to do |format|
      format.html { redirect_to campaigns_url, notice: 'Campaign was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_campaign
      @campaign = current_user.business.campaigns.where(id: params[:id]).first
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def campaign_params
      params.require(:campaign).permit(:type_of, :title, :discount_amount, :discount_type, :share_reward, :image, :status, :frequency_id, :start_at, :end_at, :locations)
    end

    def load_image_gallery
      @gallery_images = Dir.glob("app/assets/images/campaign_gallery/*.jpg")
    end
end
