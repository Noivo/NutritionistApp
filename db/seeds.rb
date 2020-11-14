# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

foods = Food.create([{name:"Milk, whole, UHT"},{name:"Goat milk, whole, UHT",}, {name:"Milk, skimmed, UHT"}, {name:"Goat milk, half skimmed, UHT pasteurized"}, {name:"Milk, fat content unknown, UHT sterilized"}, {name:"Bread"}, {name:"Apple"}])
components = Component.create([{name:"Milk, whole, UHT", quantity:"200", measure:"grams", food:foods.first}, {name:"Goat milk, whole, UHT", quantity:"200", measure:"grams", food:foods.second}])

