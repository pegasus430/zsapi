class AddTrialEndToBusiness < ActiveRecord::Migration
  def change
    add_column :businesses, :trial_ends_at, :date
  end
end
