class AddStripeTransactionDetailsToPayments < ActiveRecord::Migration
  def change
    add_column :payments, :stripe_subscription_id, :string
    add_column :payments, :stripe_plan_id, :string
    add_column :payments, :next_billing_at, :date
  end
end
