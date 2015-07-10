class ApplicationMailer < ActionMailer::Base
  default from: "no-reply@zippyspot.com"
  layout 'mailer'
end
