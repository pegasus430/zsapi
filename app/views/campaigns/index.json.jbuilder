json.array!(@campaigns) do |campaign|
  json.extract! campaign, :id, :type_of, :title, :discount_amount, :discount_type, :share_reward, :image, :featured, :active, :frequency_id, :start_at, :end_at
  json.url campaign_url(campaign, format: :json)
end
