class AddColumnsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :user_name, :string, null: false
    add_column :users, :balance, :float, null: false, default: 5000

    add_index :users, :user_name, unique: true
  end
end
