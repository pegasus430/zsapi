class AddStripeTransactionDetailsToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :stripe_subscription_id, :string
    add_column :locations, :next_billing_at, :date
  end
end
