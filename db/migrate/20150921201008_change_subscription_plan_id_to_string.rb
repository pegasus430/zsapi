class ChangeSubscriptionPlanIdToString < ActiveRecord::Migration
  def up
  	change_column :subscriptions, :stripe_sub_id, :string
  	change_column :subscriptions, :stripe_plan_id, :string, null:false
  end

  def down
  	change_column :subscriptions, :stripe_sub_id, :integer
  	change_column :subscriptions, :stripe_plan_id, :integer, null:false
  end
end
