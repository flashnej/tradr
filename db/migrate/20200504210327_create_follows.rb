class CreateFollows < ActiveRecord::Migration[5.2]
  def change
    create_table :follows do |t|
      t.belongs_to :user, null: false

      t.string :symbol, null: false

      t.timestamps
    end
  end
end
