class Location < ActiveRecord::Base
  belongs_to :business
  belongs_to :beacon
end
