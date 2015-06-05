json.array!(@locations) do |location|
  json.extract! location, :id, :business_id, :beacon_id, :title, :address, :address2, :city, :state, :zipcode
  json.url location_url(location, format: :json)
end
