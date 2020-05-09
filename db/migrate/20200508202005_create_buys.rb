class CreateBuys < ActiveRecord::Migration[5.2]
  def change
    create_table :buys do |t|
      t.belongs_to :user, null: false

      t.string :symbol, null: false
      t.float :buy_price, null: false
      t.integer :quantity, null: false

      t.timestamps
    end
  end
end
