class Admin::ReceiptsController < Admin::AdminController
  before_action :set_receipt, only: [:update, :destroy]

  def index
    if Rails.env.development?
      Receipt.update_all(status: 'untouched') ## TEMP TEST DEV LOCAL
    end
    @receipt = Receipt.untouched.first
  end

  def update
    respond_to do |format|
      if @receipt.update(receipt_params)
        if @receipt.approved?
          unless @receipt.redemption.location.business.nil? # to prevent rspec test errors
            @receipt.redemption.award_points_to_customer!
            @receipt.redemption.award_points_to_referrer!
            @receipt.redemption.award_points_to_referral!
          end
        end
        format.html { redirect_to admin_receipts_url, notice: 'Receipt was successfully updated.' }
        format.js
      else
        format.html { render :index }
        format.json { render json: @receipt.errors, status: :unprocessable_entity }
        format.js
      end
    end
  end

  def destroy
    @receipt.destroy
    respond_to do |format|
      format.html { redirect_to admin_receipts_url, notice: 'Receipt was successfully destroyed.' }
      format.json { head :no_content }
    end
  end



  private
    # Use callbacks to share common setup or constraints between actions.
    def set_receipt
      @receipt = Receipt.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def receipt_params
      params[:receipt][:status] ||= "rejected"
      params.require(:receipt).permit(:location_id, :purchased_on, :amount, :reject_reason, :status)
    end
end
