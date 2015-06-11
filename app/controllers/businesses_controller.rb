class BusinessesController < ApplicationController
  before_action :set_business, only: [:show, :edit, :update]

  # GET /businesses/new
  def new
    if !current_user.business.nil?
      redirect_to root_url, alert: "You have already created your business."
    end

    @business = Business.new
    @business.locations.build
  end

  # GET /businesses/1/edit
  def edit
  end

  # POST /businesses
  # POST /businesses.json
  def create
    @business = Business.new(business_params)

    respond_to do |format|
      if @business.save
        format.html { redirect_to @business, notice: 'Business was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end

  # PATCH/PUT /businesses/1
  # PATCH/PUT /businesses/1.json
  def update
    respond_to do |format|
      if @business.update(business_params)
        format.html { redirect_to @business, notice: 'Business was successfully updated.' }
      else
        format.html { render :edit }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_business
      @business = Business.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def business_params
      params.require(:business).permit(:user_id, :name, :published, :logo_filename, :primary_color, :secondary_color, :website, :facebook, :twitter,
        :locations_attributes => [:address, :address2, :city, :state, :zipcode]
      )
    end
end
