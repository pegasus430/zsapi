class Beacon < ActiveRecord::Base
  belongs_to :location
  belongs_to :order
end
