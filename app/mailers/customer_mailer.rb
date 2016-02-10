class CustomerMailer < ApplicationMailer

  def import_email(opts = {})
  	return false if !opts[:customer] || !opts[:business]

		subject = "Your new #{opts[:business].name} rewards are here!"

  	unless opts[:message].nil?
  		valid_tags = {
				'{FULL_NAME}'  => opts[:customer].name,
				'{FIRST_NAME}' => opts[:customer].first_name,
				'{LAST_NAME}'  => opts[:customer].last_name,
				'{EMAIL}'      => opts[:customer].email,
				'{POINTS}'     => opts[:customer].membership_for(opts[:business]).points.to_s,
  		}

  		%w({FULL_NAME} {FIRST_NAME} {LAST_NAME} {EMAIL} {POINTS}).each do |tag|
  			opts[:message].gsub!(/#{tag}/, valid_tags[tag])
  		end
    
    	mail to: opts[:customer].email, subject: subject, body: opts[:message]
    else
    	@name    = opts[:customer].name
    	@email   = opts[:customer].email
    	@points  = opts[:customer].membership_for(opts[:business]).points.to_s

    	moo = mail to: opts[:customer].email, subject: subject
    end
  end
end
