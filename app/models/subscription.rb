class Subscription < ActiveRecord::Base
  enum status: [:inactive, :active, :canceled, :suspended]
  
  belongs_to :location
  has_one :user, through: :location

  validates :location, :stripe_plan_id, presence: true

  # Start the stripe subscription
  def start!
  	business = location.business
    stripe_customer = user.find_or_create_stripe_customer

    # Subscription options
    sub_opts = {
      plan: stripe_plan_id
    }

    # Disable trial if business is already in a trial
    sub_opts.merge!(trial_ends_at: "now") if business.in_trial?
    
    # Create the subscription in STRIPE and save the ID
    stripe_sub = stripe_customer.subscriptions.create(sub_opts)
    self[:stripe_sub_id] = stripe_sub.id

    # If not in a trial, set the trial end date for business
    business.start_trial!(stripe_sub.trial_end) unless business.in_trial?

    save
  end

  def from_stripe
  	stripe_customer = user.find_or_create_stripe_customer
    return stripe_customer.subscriptions.retrieve(stripe_sub_id)
  end
end