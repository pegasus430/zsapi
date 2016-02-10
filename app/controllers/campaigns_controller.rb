class CampaignsController < ApplicationController
  before_action :set_campaign, only: [:show, :edit, :update, :destroy]
  before_action :load_image_gallery, only: [:new, :create, :edit, :update]

  def index
    @campaigns = current_user.business.campaigns
    @campaigns = @campaigns.send(params[:type]) unless params[:type] == 'all'
    @campaigns = @campaigns.send(params[:status]) unless params[:status] == 'all'
  end

  def show
    @chart_for = campaign_charts
    @stat_for = campaign_stats
  end

  def new
    @campaign = Campaign.new(type_of: params[:type])
    @campaign.build_schedule
  end

  def edit
  end

  def create
    @campaign = current_user.business.campaigns.build(campaign_params)

    # Create each image
    # copied from locations controller
    if params[:image_datafiles]
      params[:image_datafiles].each do |image|
        @campaign.image = convert_data_uri_to_upload(image) unless image.blank?
      end
    end
    ##

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

        # Push notifications
        if @campaign.active?
          current_user.business.customers.each do |c|
            c.create_push_notification(
              alert: "#{current_user.business.name} has added a new campaign. Go to the store to find out more!",
              deliver_now: false
            )
          end

          Rpush.push
          Rpush.apns_feedback
        end
        # End push notifications

        format.html { redirect_to campaigns_url, notice: 'Campaign was successfully created.' }
        format.json { render :show, status: :created, location: @campaign }
      else
        format.html { render :new }
        format.json { render json: @campaign.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      # Update each image
      ## copied from locations controller
      if params[:image_datafiles]
        params[:image_datafiles].each do |image|
          @business.image = convert_data_uri_to_upload(image) unless image.blank?
        end
      end
      ##

      if @campaign.update(campaign_params)

        format.html { redirect_to edit_campaign_url(@campaign), notice: 'Your changes have been saved!' }
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
      @campaign = current_user.business.campaigns.find(params[:id])
      @campaign.build_schedule if @campaign.schedule.blank?
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def campaign_params
      params.require(:campaign).permit( :type_of,
                                        :title, 
                                        :description, 
                                        :pos, 
                                        :discount_amount, 
                                        :discount_type, 
                                        :reward_cost, 
                                        :referral_reward, 
                                        :referrer_reward, 
                                        :image, 
                                        :status, 
                                        :frequency_id, 
                                        :start_at, 
                                        :end_at, 
                                        :end_at_selector,
                                        :schedule_attributes => [:title, :dom_selector, :day_selector, days_of_week: [], weeks_of_month: []],
                                        location_ids: [])
    end

    def load_image_gallery
      @gallery_images = Dir.glob("app/assets/images/campaign_gallery/*.jpg")
    end



    def campaign_stats
      {
        total_redemptions:            @campaign.redemptions.size,
        todays_redemptions:           @campaign.redemptions.today.size,
        mtd_redemptions:              (@campaign.redemptions.today.size) - (@campaign.redemptions.on_date(1.month.ago).size),
        total_redemption_customers:   @campaign.redemptions.group(:customer_id).size.size # The first size returns the size for each group as a hash. The second size returns the size of the actual hash
      }
    end


    def campaign_charts
      # Charts
      redemptions = Redemption.where('created_at >= ?', 30.days.ago.beginning_of_day)
      
      if params[:location_id]
        redemptions = redemptions.where(location_id: params[:location_id])
      end

      redemption_row_data = redemptions.group_by{|r| r.created_at.to_date}.map{ |k,r| {c: [k.strftime("%m/%d").to_s, r.length.to_i]} }

      redemptions_in_30_days = GoogleVisualr::Interactive::AreaChart.new(
        GoogleVisualr::DataTable.new(
          cols: [
            {type: 'string', label: 'Date'},
            {type: 'number', label: 'Redemptions'},
          ],
          rows: redemption_row_data
        ),
        {
          title: 'Redemptions (last 30 days)',
          height: 400,
          animation: {
            startup: 'true',
            easing: 'inAndOut',
            duration: 400,
          },
          hAxis: {title: "Date", showTextEvery: 1, textPosition: 'none'},
          vAxis: {minValue: 0},
          legend: {
            position: 'bottom',
            maxLines: 3,
          },
          colors: [
            '#4CD9B9',
            '#FF0141',
            '#4990E2'
          ],
          areaOpacity: 0.9,
          backgroundColor: '#f4f4f5'
        }
      )


      # Return the values
      {
        redemptions_in_30_days: redemptions_in_30_days
      }
    end
end
