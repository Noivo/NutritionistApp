json.extract! meal, :id, :name, :hours, :minutes, :midday, :created_at, :updated_at
json.url meal_url(meal, format: :json)
