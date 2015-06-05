json.array!(@orders) do |order|
  json.extract! order, :id, :location_id, :beacon_id, :buyer_ip, :purchase_date, :transaction_id, :key, :status
  json.url order_url(order, format: :json)
end
