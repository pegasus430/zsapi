json.array!(@businesses) do |business|
  json.extract! business, :id, :user_id, :name, :published, :logo_filename, :primary_color, :secondary_color, :website, :facebook, :twitter
  json.url business_url(business, format: :json)
end
