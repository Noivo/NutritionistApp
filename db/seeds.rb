# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

meals = Meal.create([{ingredient:"Milk, whole, UHT", quantity:"200", measure:"grams"}, {ingredient:"Goat milk, whole, UHT", quantity:"200", measure:"grams"}])
ingredients = Ingredient.create([{name:"Milk, whole, UHT", meal:meals.first},{name:"Goat milk, whole, UHT", meal:meals.first}, {name:"Milk, skimmed, UHT", meal:meals.first}, {name:"Goat milk, half skimmed, UHT pasteurized", meal:meals.first}, {name:"Milk, fatcontent unknown, UHT sterilized", meal:meals.first}, {name:"Bread", meal:meals.first}, {name:"Apple", meal:meals.first}])

