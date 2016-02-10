class ReceiptsController < ApplicationController

  def index
    if params[:location_id]
      receipts = current_user.locations.where(id: params[:location_id]).first.receipts
    else
      receipts = current_user.business.receipts
    end

    # Validate each query-string param
    %w(start_date end_date).each do |d|
      params[d.to_s] = Date.parse(params[d.to_s]) rescue nil
    end

    if params[:start_date] && params[:end_date]
      receipts = receipts.where(purchased_on: params[:start_date]..params[:end_date])
    elsif params[:start_date]
      receipts = receipts.where(purchased_on: params[:start_date])
    end

    @approved_receipts = receipts.approved
  end


  def show
    @receipt = current_user.business.receipts.find(params[:id])

    respond_to do |format|
      format.js { render :show }
    end
  end

  
  private
    def receipt_params
      #permit nothing
      params.require(:receipt).permit()
    end
end
