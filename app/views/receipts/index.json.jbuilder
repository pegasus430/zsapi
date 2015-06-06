json.array!(@receipts) do |receipt|
  json.extract! receipt, :id, :location_id, :purchased_on, :amount, :approved_on, :rejected_on, :reject_reason
  json.url receipt_url(receipt, format: :json)
end
