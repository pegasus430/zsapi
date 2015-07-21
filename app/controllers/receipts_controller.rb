class ReceiptsController < ApplicationController
  before_action :set_receipt, only: [:show]

  def index
    if params[:location_id]
      receipts = current_user.locations.where(id: params[:location_id]).first.receipts
    else
      receipts = current_user.business.receipts
    end

    if params[:start_date] && params[:end_date]
      receipts = receipts.where(purchased_on: params[:start_date]..params[:end_date])
    elsif params[:start_date]
      receipts = receipts.where(purchased_on: params[:start_date])
    end

    @approved_receipts = receipts.approved
  end


  def show
  end

  
  private
    def set_receipt
      @receipt = current_user.business.receipts.where(id: params[:id]).first
    end

    def receipt_params
      #permit nothing
      params.require(:receipt).permit()
    end
end
