class CreateMeals < ActiveRecord::Migration[6.0]
  def change
    create_table :meals do |t|
      t.string :name
      t.integer :hours
      t.integer :minutes
      t.string :midday

      t.timestamps
    end
  end
end
