class Visit < ActiveRecord::Base
  belongs_to :customer
  belongs_to :location

  validates_presence_of :total

  ## This allows us to easily grab the membership of the
  ## customer and business from within the API call
  def membership_points
    customer.membership_for(location.business).points
  end

  def self.check_in!(opts)
    customer = opts[:customer]
    location = opts[:location]

    # Create the visit for the location
    visit = Visit.find_or_create_by(customer: customer, location: location)
    visit.last_visit_at = Time.now
    visit.increment(:total)
    visit.save

    # Get the greeting
    greeting   = location.greeting
    membership = customer.membership_for(location.business)

    # Check if we've waited long enough before returning so we can get the reward
    if membership.can_receive_welcome_reward?
      points_earned = greeting.welcome_reward

      # Update the membership
      membership.increment(:points, points_earned )
      membership.set_new_welcome_reward_valid_at(1.send(greeting.welcome_wait_time))
      membership.save
    else
      points_earned = 0
    end
    

    # Check if we have a valid exit-campaign to show
    exit_campaign = membership.exit_campaign_valid? ? membership.campaign : nil


    return {
      welcome_message:  greeting.welcome_message,
      points_earned:    points_earned,
      campaign:         exit_campaign
    }
  end


  def self.check_out!(opts)
    customer = opts[:customer]
    location = opts[:location]

    # Get the greeting
    greeting   = location.greeting
    membership = customer.membership_for(location.business)

    membership.campaign = greeting.campaign
    membership.set_new_exit_campaign_expires_at(greeting.campaign_wait_time)
    membership.save

    return {
      exit_message: greeting.exit_message,
      wait_time:    greeting.campaign_wait_time,
      campaign:     greeting.campaign
    }
  end
end
