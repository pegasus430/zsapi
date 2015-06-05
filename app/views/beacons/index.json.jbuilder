json.array!(@beacons) do |beacon|
  json.extract! beacon, :id, :location_id, :order_id, :uuid, :void
  json.url beacon_url(beacon, format: :json)
end
