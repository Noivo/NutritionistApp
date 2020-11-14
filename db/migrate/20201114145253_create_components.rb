class CreateComponents < ActiveRecord::Migration[6.0]
  def change
    create_table :components do |t|
      t.string :name
      t.string :quantity
      t.string :measure
      t.belongs_to :food


      t.timestamps
    end
  end
end
