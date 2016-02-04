class GreetingsController < ApplicationController
  before_action :set_greeting, only: [:edit, :update, :destroy]
  before_action :set_campaigns, only: [:edit, :update, :new, :create]

  def index
    @greetings = current_user.business.greetings
  end

  def new
    @greeting = current_user.business.greetings.build
  end

  def edit
  end

  def create
    @greeting = Greeting.new(greeting_params)
    @greeting.business = current_user.business

    respond_to do |format|
      if @greeting.save
        format.html { redirect_to greetings_path, notice: 'Greeting was successfully created!' }
      else
        format.html { render :new }
      end
    end
  end

  def update
    respond_to do |format|
      if @greeting.update(greeting_params)
        format.html { redirect_to edit_greeting_path(@greeting), notice: 'Greeting was successfully updated.' }
        format.json { render :edit, status: :ok, greeting: @greeting }
      else
        format.html { render :edit }
        format.json { render json: @greeting.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @greeting.destroy
    respond_to do |format|
      format.html { redirect_to locations_url, notice: 'greeting was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_greeting
      @greeting = current_user.business.greetings.find(params[:id])
    end

    def set_campaigns
      @campaigns = current_user.business.campaigns
    end

    def greeting_params
      params.require(:greeting).permit(:welcome_message, :welcome_reward, :welcome_reward_freq, :welcome_wait_time, :campaign_wait_time_quantity, :campaign_wait_time_span, :exit_message, :campaign_id, :exit_freq_days, :exit_freq_type)
    end
end
