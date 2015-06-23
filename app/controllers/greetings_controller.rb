class GreetingsController < ApplicationController
  before_action :set_greeting, only: [:edit, :update, :show]

  def show
  end

  def new
    @greeting = @current_location.build_greeting
  end

  def edit
  end

  def create
    @greeting = Greeting.new(greeting_params)

    respond_to do |format|
      if @greeting.save
        format.html { redirect_to new_order_path, notice: 'Greeting was successfully created. Create the payment now' }
      else
        format.html { render :new }
      end
    end
  end

  def update
    respond_to do |format|
      if @greeting.update(greeting_params)
        format.html { redirect_to [@current_location, @greeting], notice: 'Greeting was successfully updated.' }
        format.json { render :edit, status: :ok, greeting: @greeting }
      else
        format.html { render :edit }
        format.json { render json: @greeting.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    def set_greeting
      @greeting = Greeting.find(params[:id])
    end

    def greeting_params
      params.require(:greeting).permit(:welcome_message, :welcome_reward, :welcome_reward_freq, :exit_message, :exit_campaign_id, :exit_freq_days, :exit_freq_type)
    end
end
