json.array!(@customers) do |customer|
  json.extract! customer, :id, :first_name, :last_name, :email, :points, :active, :contacted
  json.url customer_url(customer, format: :json)
end
